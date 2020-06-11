const express = require('express');

const taskRouter = express.Router({ mergeParams: true });
const { Projects } = require('../projects/project-model');
const updateTask = require('../core/update-task');

taskRouter.route('/')
  .get((req, res) => {
    Projects
      .findById(req.params.id)
      .exec()
      .then((projects) => {
        const tasks = projects.tasks;
        res.json({ tasks });
      })
      .catch(
        (err) => {
          console.error(err);
          res.status(404)
            .json({ message: 'Not Found' });
        });
  });

taskRouter.route('/:taskId')
  .put((req, res) => {
    updateTask(req, res, Projects);
  })
  .delete((req, res) => {
    Projects
      .update(
        { _id: req.params.id },
        { $pull: { tasks: { _id: req.params.taskId } } })
      .exec()
      .then((project) => {
        return res.status(204)
          .end();
      })
      .catch((err) => {
        return res.status(404)
          .json({ message: 'Not Found' });
      });
  });

module.exports = taskRouter;
