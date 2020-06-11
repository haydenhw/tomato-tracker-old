const express = require('express');
const projectRouter = express.Router();
const { createDailyProject, isTodayPDT } = require('../dailyProject');
const { Projects } = require('../models');

projectRouter.route('/')
  .get(async (req, res, next) => {
    const createPDTTimesatmp = (dateObj) => {
      const offsetPDT = -7 * 60 * 60 * 1000;
      const date = dateObj || new Date();
      return new Date(date.getTime() + offsetPDT);
    }

    console.log('GET projects called at ', createPDTTimesatmp())

    let [timeOfLastDailyProjectCreation] = await Projects.find({isDailyProject: true })
      .sort({ _id: -1 })
      .limit(1)
      .select({ 'createdAt': 1 });

    timeOfLastDailyProjectCreation = new Date(timeOfLastDailyProjectCreation.createdAt);

    // During PST isTodayPDT will be true if timestamp is less than 12am
    // During PDT it will be true if less than 1am
    console.log('Timestamp of last project', createPDTTimesatmp(timeOfLastDailyProjectCreation));
    if (!isTodayPDT(timeOfLastDailyProjectCreation)) {
        console.log('Creating new daily project');
        const tasks = ['Work', 'Not Work'];
        const newProject = createDailyProject(tasks);
        Projects.create(newProject)
      }

    next();
  })
  .get((req, res) => {
    Projects
      .find()
      .sort({createdAt: -1})
      .exec()
      .then((projects) => {
        return res.json({ projects });
      })
      .catch(
        (err) => {
          console.error(err);
          res.status(500)
            .json({ message: 'Internal Server Error' });
        });
  })
  .post((req, res) => {
    if (!('projectName' in req.body)) {
      const message = 'Missing projectName in request body';
      console.error(message);
      return res.status(400)
        .send(message);
    }

    Projects
      .findOne({ projectName: req.body.projectName })
      .exec()
      .then((project) => {
        if (project) {
          const message = 'That project already exists. Please use a different project name';
          res.status(409)
            .send(message);
        } else {
          return Projects
            .create({
              projectName: req.body.projectName,
              position: req.body.position,
              tasks: req.body.tasks,
              shortId: req.body.shortId,
              isDailyProject: req.body.isDailyProject,
            });
        }
      })
      .then((project) => {
        return res.status(201)
          .json(project);
      })
      .catch((err) => {
        console.error(err);
        res.status(500)
          .json({ message: 'Internal server error' });
      });
  });

projectRouter.route('/:projectId')
  .get((req, res) => {
    Projects
      .findById(req.params.projectId)
      .exec()
      .then((projects) => {
        return res.json({ projects });
      })
      .catch((err) => {
        console.error(err);
        res.status(404)
          .json({ message: 'Project Not Found' });
      });
  })
  .post((req, res) => {
    const toUpdate = { tasks: req.body };
    const requiredTaskFields = ['taskName', 'recordedTime'];

    for (let j = 0; j < requiredTaskFields.length; j++) {
      const field = requiredTaskFields[j];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`;
        console.error(message);
        return res.status(400)
          .send(message);
      }
    }

    Projects
      .findById(req.params.projectId)
      .exec()
      .then((project) => {
        const taskIndex = project.tasks.findIndex((task) => {
          return task.taskName === req.body.taskName;
        });

        if (taskIndex > -1) {
          const message = 'That task already exists. Please use a different task name.';
          console.error(message);
          res.status(409)
            .send(message);
        } else {
          return Projects
            .findByIdAndUpdate(req.params.projectId, { $push: toUpdate }, { new: true });
        }
      })
      .then((project) => {
        return res.status(201)
          .json(project.tasks[project.tasks.length - 1]);
      })
      .catch((err) => {
        console.error(err);
        res.status(404)
          .json({ message: 'Project Not Found' });
      });
  })
  .put((req, res) => {
    console.log(req.body);

    //  if (!((req.params.projectId && req.body._id) && (req.params.projectId === req.body._id))) {
    //      const message = (`Request path id (${req.params.projectId}) and request body id (${req.body._id}) must match`);
    //      console.error(message);
    //      res.status(400).json({ message });
    //  }

    if (!('projectName' in req.body && req.body.projectName)) {
      return res.status(400)
        .json({ message: 'Must specify value for projectName' });
    }

    const toUpdate = {
      projectName: req.body.projectName,
      'position:': req.body.position,
    };

    Projects
      .findByIdAndUpdate(req.params.projectId, { $set: toUpdate })
      .exec()
      .then((project) => {
        return res.status(204)
          .end();
      })
      .catch((err) => {
        return res.status(500)
          .json({ message: 'Internal server error' });
      });
  })
  .delete((req, res) => {
    Projects
      .findByIdAndRemove(req.params.projectId)
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

module.exports = projectRouter;
