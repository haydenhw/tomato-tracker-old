import faker from 'faker';

export const getFakeProject = (getTaskArray, arrayLengthFunc) => () => ({
  projectName: faker.random.word(),
  _id : faker.random.uuid(),
  shortId: faker.random.uuid(),
  tasks: getTaskArray(arrayLengthFunc()),
});

export const getFakeTask = () => ({
  taskName: faker.random.word(),
  _id : faker.random.uuid(),
  shortId: faker.random.uuid(),
  recordedTime: faker.random.number(),
});

const isFunction = val => typeof val === 'function';

export const generateArray = callback => length => {
  if (isFunction(length)){
    length = length();
  }

  const arr = [];
  for (let i = 0; i < length; i++) {
    const dataItem = callback();
    arr.push(dataItem);
  }
  return arr;
};

const getRandomInteger = (min, max) => () => (
  Math.floor(Math.random() * (max - min) + min)
);

export const getFakeProjectArray = (projectLength, taskLengthMin, taskLengthMax) => {
  const getTaskArray = generateArray(getFakeTask);
  const getProjectWithTasks = (
    getFakeProject(getTaskArray, getRandomInteger(taskLengthMin, taskLengthMax))
  );

  return generateArray(getProjectWithTasks)(projectLength);
};
