export const DECREMENT_TIMER = "DECREMENT_TIMER";
export function decrementTimer() {
  return {
    type: "DECREMENT_TIMER"
  }
}

export const TOGGLE_IS_TIMER_ACTIVE = "TOGGLE_IS_TIMER_ACTIVE";
export function toggleIsTimerActive() {
  return {
    type: "TOGGLE_IS_TIMER_ACTIVE"
  }
}

export const INCREMENT_TASK_TIME = "INCREMENT_TASK_TIME";
export function incrementTaskTime(projectId, taskId) {
  return {
    type: "INCREMENT_TASK_TIME",
    projectId,
    taskId
  }
}
