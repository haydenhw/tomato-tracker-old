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

export const SET_START_TIME = "SET_START_TIME";
export function setStartTime(startTime) {
  return {
    type: "SET_START_TIME",
    startTime: Math.ceil(Number(startTime) * 60)  
  }
}

export const START_TIMER = "START_TIMER";
export function startTimer() {
  return {
    type: "START_TIMER",
  }
}

export const RESET_TIMER = "RESET_TIMER";
export function resetTimer() {
  return {
    type: "RESET_TIMER",
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
