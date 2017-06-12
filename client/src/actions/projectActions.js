import shortid from 'shortid';

export const ADD_PROJECT = "ADD_PROJECT";
export function addProject(projectName) {
  const newProject = {
    projectName,
    tasks: [],
    shortId: shortid.generate()
  }
  
  return {
    type: ADD_PROJECT,
    project: newProject
  }
}

export const ADD_TASK = "ADD_TASK";
export function addTask(projectId, taskName) {
  return {
    type: ADD_TASK,
    projectId,
    taskName
  }
}

export const SET_ACTIVE_PROJECT = "SET_ACTIVE_PROJECT";
export function setActiveProject(projectId) {
  return {
    type: "SET_ACTIVE_PROJECT",
    projectId
  }
}

export const DELETE_TASK = "DELETE_TASK";
export function deleteTask(projectId, taskId) {
  return {
    type: DELETE_TASK,
    projectId,
    taskId
  }
}

