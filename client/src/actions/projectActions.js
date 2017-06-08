export const ADD_TASK = "ADD_TASK";
export function addTask(projectId, taskName) {
  return {
    type: ADD_TASK,
    projectId,
    taskName
  }
}