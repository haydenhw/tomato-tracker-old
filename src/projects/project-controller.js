const { Projects } = require('./project-model');
const { createDailyProject, isTodayPDT } = require('./daily-project');

const createDailyProjectIfNeeded = async (req, res, next) => {
  const [mostRecentDailyProject] = await Projects.find({ isDailyProject: true })
    .sort({ _id: -1 })
    .limit(1)
    .select({ createdAt: 1 });

  if (!mostRecentDailyProject) {
      next();
      return;
  }

  const timeOfLastDailyProjectCreation = new Date(mostRecentDailyProject.createdAt);

  // During PST isTodayPDT will be true if timestamp is less than 12am
  // During PDT it will be true if less than 1am
  if (!isTodayPDT(timeOfLastDailyProjectCreation)) {
    const tasks = ['Work', 'Not Work'];
    const newProject = createDailyProject(tasks);
    Projects.create(newProject);
  }

  next();
};

const fetchProjects = (req, res) => {
  Projects
    .find()
    .sort({ createdAt: -1 })
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
};

const createProject = (req, res) => {
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
};
module.exports = { createDailyProjectIfNeeded, fetchProjects, createProject  };
