import axios from 'axios';
import { timeStringToSeconds } from '../helpers/time';

export const SET_REMAINING_TIME = 'SET_REMAINING_TIME';

export function setRemainingTime(time) {
  return {
    type: 'SET_REMAINING_TIME',
    time,
  };
}

export const SET_TIMER_ACTIVE = 'SET_TIMER_ACTIVE';

export function setTimerActive(isActive) {
  return {
    type: 'SET_TIMER_ACTIVE',
    isActive,
  };
}

export const TOGGLE_DESKTOP_NOTIFICATION = 'TOGGLE_DESKTOP_NOTIFICATION';

export function toggleDesktopNotification(state) {
  return {
    type: 'TOGGLE_DESKTOP_NOTIFICATION',
    state,
  };
}

export const HANDLE_TIMER_COMPLETE = 'HANDLE_TIMER_COMPLETE';

export function handleTimerComplete() {
  return (dispatch, getState) => {
    const { alarmSoundSrc } = getState().config;

    dispatch({
      type: 'HANDLE_TIMER_COMPLETE'
    });

    dispatch({
      type: 'STOP_TIMER'
    });
    console.log('playing sound', Date()
      .split(' ')[4]);

    const audio = new Audio(alarmSoundSrc);
    audio.play();

    // switch to second desktop
    axios.post(`http://${'localhost'}:3946`);

    dispatch(toggleDesktopNotification(true));
    setTimeout(
      () => {
        dispatch(toggleDesktopNotification(false));
      }, 10000
    );
  };
}

export const TOGGLE_TIMER = 'TOGGLE_TIMER';

export function toggleTimer(selectedTaskId) {
  return (dispatch, getState) => {
    const { isTimerActive } = getState().timer;

    if (isTimerActive) {
      document.title = 'Tomato Tracker';
      // fetch('/stop-entry', {
      //   method: 'put',
      // });
    } else {
      // send request to start timer to server
    }

    dispatch({
      type: 'TOGGLE_TIMER',
    });
  };
}

export const SET_START_TIME = 'SET_START_TIME';

export function setStartTime(startTime, project, task, shouldToggleTimer) {
  return (dispatch, getState) => {
    startTime = isNaN(startTime) ? timeStringToSeconds(startTime, 'MMSS') : Math.ceil(Number(startTime) * 60);
    startTime = startTime === 'NAN_ERROR' ? getState().timer.startTime : startTime;


    dispatch({
      type: 'SET_START_TIME',
      startTime,
      shouldToggleTimer
    });

    if (shouldToggleTimer) {
      dispatch(startTimer(startTime, project, task));
    }
  };
}

export const START_TIMER = 'START_TIMER';

export function startTimer(startTime, project, task) {
  return (dispatch) => {
    if (!task) {
      return null;
    }

    dispatch({
      type: 'START_TIMER',
    });


    const updatedTask = Object.assign({}, task, { startTime: startTime - 1 });

    fetch(`timer/start/${project._id}/${task._id}`, {
      method: 'POST',
      body: JSON.stringify(updatedTask),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  };
};

export const STOP_TIMER = 'STOP_TIMER';

export function stopTimer() {
  return (dispatch) => {
    dispatch({
      type: 'STOP_TIMER',
    });

    fetch('timer/stop', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  };
};

export const INCREMENT_TASK_TIME = 'INCREMENT_TASK_TIME';

export function incrementTaskTime(project, task) {
  return (dispatch) => {
    if (!task) {
      return null;
    }

    dispatch({
      type: 'INCREMENT_TASK_TIME',
      projectId: project.shortId,
      taskId: task.shortId
    });
  };
}
