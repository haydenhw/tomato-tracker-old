const express = require('express');
const bodyParser = require('body-parser');
const { TestData } = require('./models');
const testRouter = express.Router();

testRouter.use(bodyParser.urlencoded({
  extended: true
}));
testRouter.use(bodyParser.json());

testRouter.get('/', (req, res) => {
  console.log('get request')
  //res.send({testRouter: 'success'});
  TestData
    .find()
    .exec()
    .then(data => res.json(data))
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal Server Error'});
      });
});

testRouter.get('/:projectId', (req, res) => {
  console.log('get project by id')
  TestData
    .findById(req.params.projectId)
    .exec()
    .then(project => res.json(project))
    .catch(err => {
        console.error(err);
        res.status(404).json({message: 'Project Not Found'});
      });
});

testRouter.post('/', (req, res) => {
  console.log(req.body)
  TestData
    .create({
      testData: req.body.testData
    })
  .then(testObj => res.status(201).json(testObj))
  .catch(err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});

testRouter.put('/:projectId', (req, res) => {
  console.log(req.body)
  const toUpdate = {
    name: req.body.projectName,
    boardSpecs: req.body.boardSpecs,
    modules: req.body.modules,
    boardModules: req.body.boardModules
  }
  console.log(toUpdate)
  testData
    .findByIdAndUpdate(req.params.projectId, {$set: toUpdate})
    .exec()
    .then(project => res.status(204).end())
    .catch(err => 
      res.status(500).json({message: 'Internal server error'})
    );
});

testRouter.delete('/:projectId', (req, res) => {
  testData
    .findByIdAndRemove(req.params.projectId)
    .exec()
    .then(project => res.status(204).json(project))
    .catch(err => res.status(404).json({message: 'Not Found'}));
});

module.exports = testRouter;