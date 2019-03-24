import { createSelector } from 'reselect';

export const getProjects = state => state.projects.items;
export const getSelectedProjectId = state => state.selectedProjectId;
export const getSelectedTaskId = state => state.selectedTaskId;
export const getTaskStartedTime = state =>state.timer.taskStartedTime;

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
