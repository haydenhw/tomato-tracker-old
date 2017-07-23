import { timeStringToSeconds } from '../helpers/time';

export const DECREMENT_TIMER = "DECREMENT_TIMER";
export function decrementTimer() {
  return { 
    type: "DECREMENT_TIMER"
  }
}

// export const TOGGLE_IS_TIMER_ACTIVE = "TOGGLE_IS_TIMER_ACTIVE";
// export function toggleTimer() {
//   return {
//     type: "TOGGLE_IS_TIMER_ACTIVE"
//   }
// }

export const TOGGLE_TIMER = "TOGGLE_TIMER";
export function toggleTimer(startTime, shouldStartTimer) {
  return (dispatch, getState) => {
    // startTime = isNaN(startTime) ? timeStringToSeconds(startTime, 'MMSS') : Math.ceil(Number(startTime) * 60);  
    // startTime = startTime === 'NAN_ERROR' ?  getState().timer.startTime : startTime;
    
    return dispatch({
      type: "TOGGLE_TIMER",
      shouldStartTimer,
      startTime  
    });
  }
}

// export const START_TIMER = "START_TIMER";
// export function startTimer() {
//   return {
//     type: "START_TIMER",
//   }
// }

export const RESET_TIMER = "RESET_TIMER";
export function resetTimer() {
  return {
    type: "RESET_TIMER",
  }
}

export const INCREMENT_TASK_TIME = "INCREMENT_TASK_TIME";
export function incrementTaskTime(project, task) {
  
  return (dispatch) => {
    const updatedTask = Object.assign({}, task, { recordedTime: task.recordedTime + 1 })
    
    dispatch({
      type: "INCREMENT_TASK_TIME",
      projectId: project.shortId,
      taskId: task.shortId
    });
    
    
    fetch(`projects/${project._id}/tasks/${task._id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedTask),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}