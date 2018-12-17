const shouldDeleteDb = false;

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();

// const shouldResetDb = false;

const { PORT, DATABASE_URL } = require('./server-files/config');
const { FeatureRequests, Logs } = require('./server-files/models');
const stopRunningEntry = require('./server-files/stopRunningEntry');

const projectRouter = require('./server-files/routes/projectRouter');
const taskRouter = require('./server-files/routes/taskRouter');

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

projectRouter.use('/:id/tasks', taskRouter);
app.use('/projects', projectRouter);

app.get('/log', (req, res) => {
  Logs
    .find()
    .exec()
    .then(data => res.json(data.reverse()));
});

app.post('/log', (req, res) => {
  console.log(req.body)
  Logs
    .create({
      taskName: req.body.taskName,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      recordedTime: req.body.recordedTime,
      parentProjectName: req.body.parentProjectName,
    })
  .then(testObj => res.status(201).json(testObj))
  .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

app.get('/fr', (req, res) => {
  FeatureRequests
    .find()
    .exec()
    .then(data => res.json(data))
});

app.post('/fr', (req, res) => {
  console.log('post hit')
  FeatureRequests
    .create({
      featureRequests: req.body.featureRequests
    })
  .then(testObj => res.status(201).json(testObj))
  .catch(err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});

app.put('/fr/:frId', (req, res) => {
  console.log('put endpoint hit')

  const toUpdate = {
    featureRequests: req.body.featureRequests,
  }

  FeatureRequests
    .findByIdAndUpdate(req.params.frId, toUpdate)
    .exec()
    .then(project => res.status(204).json(toUpdate))
    .catch(err =>
      res.status(500).json({message: 'Internal server error'})
    );
});

app.put(('/stop-entry'), (req, res) => {
  stopRunningEntry();
});

app.use('*', (req, res) => {
  res.status(404).json({ sorry: '404 Not Found' });
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
      .then((result) => { return resolve(result); })
      .catch((err) => { return reject(err); });
    });
}

// if (shouldResetDb === true) {
//     resetDb();
// }

if (shouldDeleteDb === true) {
    console.log('**************** Deleting Database *********************');
    tearDownDb();
}

let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl, {useMongoClient: true}, (err) => {
            if (err) {
                return reject(err);
            }
            server = app.listen(port, () => {
                console.log(`Your app is listening on port ${port}`);
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
    return mongoose.disconnect().then(() => {
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
    runServer().catch((err) => { return console.error(err); });
}

module.exports = { app, runServer, closeServer };
