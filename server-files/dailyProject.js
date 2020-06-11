const shortId = require('shortid');

const isTodayPDT = (dateObj) => {
  const offsetPDT = -7 * 60 * 60 * 1000;
  dateObj = new Date(dateObj.getTime() + offsetPDT);
  console.log('\nTested date after offset', dateObj, '\n');
  let now = new Date();
  now = new Date(now.getTime() + offsetPDT);
  console.log('\nNow', dateObj, '\n');
  const day = now.getDay();
  const month = now.getMonth();
  const year = now.getYear();

  console.log('Is Today returning',
    (
      dateObj.getDay() === day &&
      dateObj.getMonth() === month &&
      dateObj.getYear() === year
    )
  )

  return (
    dateObj.getDay() === day &&
    dateObj.getMonth() === month &&
    dateObj.getYear() === year
  );
};

const generateProjectName = () => {
  const [wkday, month, calendarDay] = Date()
    .split(' ')
    .slice(0, 3);
  return `${wkday} ${month} ${parseInt(calendarDay)}`;
};

const createTask = ({ name, key, id }) => {
  return {
    key,
    taskName: name,
    shortId: id,
    shouldDelete: false,
    recordedTime: 0,
  };
};

const createTasks = (tasks) => {
  return tasks.map(taskName => {
    return createTask({
      name: taskName,
      key: shortId.generate(),
      id: shortId.generate(),
    });
  });
};

const createProject = ({ name, tasks, id, isDailyProject }) => {
  return {
    tasks,
    isDailyProject,
    projectName: name,
    shortId: id,
  };
};

const createDailyProject = (tasks) => {
  const _tasks = createTasks(tasks);
  return createProject({
    name: generateProjectName(),
    id: shortId.generate(),
    isDailyProject: true,
    tasks: _tasks,
  });
};

module.exports = { createDailyProject, isTodayPDT };
