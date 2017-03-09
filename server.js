const express = require('express')
const bp = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');
//app.set('port', (process.env.PORT || 3001));

const { Modules, Projects } = require('./models');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(bp.urlencoded({
  extended: true
}));
app.use(bp.json());
// app.use(express.static(__dirname + '/public'));

app.get('/modules', (req, res) => {
  
  Modules
    .find()
    .exec()
    .then(modules => res.json(modules))
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal Server Error'});
      });
});

app.get('/projects', (req, res) => {
  console.log('hello from project get endpoint')
  Projects
    .find()
    .exec()
    .then(projects => res.json(projects))
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal Server Error'});
      });
});

app.post('/projects', (req, res) => {
  console.log('post hit');
  console.log(req.body)
  
  Projects
    .create({
      name: req.body.name,
      boardSpecs: req.body.boardSpecs,
      moudles: req.body.modules
    })
  .then(project => res.status(201).json(project))
  .catch(err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});

app.put('/projects/:id', (req, res) => {
  
  const toUpdate = {
    'name': req.body.projectName,
    'position:': req.body.position
  }

  Projects
    .findByIdAndUpdate(req.params.projectId, {$set: toUpdate})
    .exec()
    .then(project => res.status(204).end())
    .catch(err => 
      res.status(500).json({message: 'Internal server error'})
  );
})


app.get('/test', (req, res) => {
  console.log('test hit');
  res.send({test: 'success'});
});

app.post('/test', (req, res) => {
  console.log('post hit');
  console.log(req.body)
  
  Modules
    .create({
      'function': req.body.function,
      'height': req.body.height,
      'width': req.body.width
    })
  .then(project => res.status(201).json(project))
  .catch(err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});

let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
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
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};
