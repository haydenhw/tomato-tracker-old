const shouldDeleteDb = false;

require('dotenv')
  .config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const path = require('path');

const app = express();
const http = require('http')
  .Server(app);

const { PORT, DATABASE_URL } = require('./src/config');
console.log({ DATABASE_URL });
const { FeatureRequests, Logs } = require('./src/models');

const makeTimerRouter = require('./src/timer/timer-router');
const projectRouter = require('./src/projects/project-router');
const taskRouter = require('./src/tasks/task-router');

const timerRouter = makeTimerRouter(http);

mongoose.Promise = global.Promise;
mongoose.set('useUnifiedTopology', true);

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
}


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

projectRouter.use('/:id/tasks', taskRouter);
app.use('/projects', projectRouter);
app.use('/timer', timerRouter);

app.post('/desktop2', (req, res) => {
  if (process.env.SKIP_TIMER_SCRIPT) {
    console.log('Skipping desktop2 POST');
    return res.end();
  }

  axios.post('http://127.0.0.1:3946', {
    firstName: 'Fred',
    lastName: 'Flintstone',
  });
  res.end();
});

app.get('/log', (req, res) => {
  Logs
    .find()
    .exec()
    .then((logs) => {
      const limit = 100;
      const reverseLogs = [...logs].reverse();
      const recentLogs = (
        reverseLogs.length > limit
          ? reverseLogs.slice(0, limit)
          : reverseLogs
      );
      return res.json(recentLogs);
    });
});

app.post('/log', (req, res) => {
  Logs
    .create({
      taskName: req.body.taskName,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      recordedTime: req.body.recordedTime,
      parentProjectName: req.body.parentProjectName,
    })
    .then(testObj => res.status(201)
      .json(testObj))
    .catch(err => {
      console.error(err);
      res.status(500)
        .json({ message: 'Internal server error' });
    });
});

app.get('/fr', (req, res) => {
  FeatureRequests
    .find()
    .exec()
    .then(data => res.json(data));
});

app.post('/fr', (req, res) => {
  console.log('post hit');
  FeatureRequests
    .create({
      featureRequests: req.body.featureRequests
    })
    .then(testObj => res.status(201)
      .json(testObj))
    .catch(err => {
      console.error(err);
      res.status(500)
        .json({ message: 'Internal server error' });
    });
});

app.put('/fr/:frId', (req, res) => {
  console.log('put endpoint hit');

  const toUpdate = {
    featureRequests: req.body.featureRequests,
  };

  FeatureRequests
    .findByIdAndUpdate(req.params.frId, toUpdate)
    .exec()
    .then(project => res.status(204)
      .json(toUpdate))
    .catch(err =>
      res.status(500)
        .json({ message: 'Internal server error' })
    );
});

app.use('*', (req, res) => {
  res.status(404)
    .json({ messageToSlef: '404 Not Found \n Perhaps you\'d rather be running in prodcution mode? Check package.json!' });
});

// const seedSampleData = () => {
//     const seedData = sampleData.projects;
//
//     return Projects.insertMany(seedData);
// };

// function resetDb() {
//     return new Promise((resolve, reject) => {
//         console.warn('Resetting database');
//         mongoose.connection.dropDatabase()
//     .then((result) => {
//         seedSampleData();
//         resolve(result);
//     })
//     .catch((err) => { return reject(err); });
//     });
// }
function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then((result) => {
        return resolve(result);
      })
      .catch((err) => {
        return reject(err);
      });
  });
}


if (shouldDeleteDb === true) {
  console.log('**************** Deleting Database *********************');
  tearDownDb();
}

let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, { useNewUrlParser: true }, (err) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      server = http.listen(port, () => {
        console.log('\n');
        console.log(`Your app is listening on port ${port}`);
        console.log(`NODE_ENV set to ${process.env.NODE_ENV}`);
        console.log('Set environment variable SKIP_TIMER_SCRIPT=true to disable script that runs on timer start / stop');
        console.log('\n');
        resolve();
      })
        .on('error', (err) => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect()
    .then(() => {
      return new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    });
}

if (require.main === module) {
  runServer()
    .catch((err) => {
      return console.error(err);
    });
}

module.exports = { app, runServer, closeServer };
