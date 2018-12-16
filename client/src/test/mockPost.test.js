import { createSelector } from 'reselect';
import { getDuration } from '../helpers/logHelpers';
import { mockState } from './mockState';

const prettyPrint = obj => {
  console.log(JSON.stringify(obj, null, 2));
}
console.log('\n\n**Logs**');


export const getProjects = state => state.projects.items;
export const getSelectedProjectId = state => state.selectedProjectId;
export const getTaskStartedTime = state => state.timer.taskStartedTime;

export const getSelectedProject = createSelector(
  getProjects,
  getSelectedProjectId,
  (projects, selectedProjectId) => projects.find(
    (project) => project.shortId === selectedProjectId
  )
);

export const getActiveTasks =  createSelector(
  getSelectedProject,
  selectedProject => selectedProject.tasks
);

export const getActiveTask = (state, selectedTaskId) => {
  const selectedProject = getSelectedProject(state);
  return selectedProject.tasks.find(task => task.shortId === selectedTaskId);
}


const createEntry = (state, selectedTaskId) => {
  const {
    taskName,
    recordedTime,
  } = getActiveTask(state, selectedTaskId);
  const startTime = getTaskStartedTime(state);
  const endTime = new Date().getTime();
  const parentProjectName = getSelectedProject(state).projectName;

  return {
    taskName,
    startTime,
    endTime,
    recordedTime,
    parentProjectName,
  }
}

const res = createEntry(mockState, "rJlAIrgWDG");
prettyPrint(res);

test('formats start time', async () => {
  expect(true).toBe(true);
});
