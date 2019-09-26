import * as actions from '../actions/indexActions';

const defaultState = {
  isTimerActive: false,
  isDesktopNotificationActive: false,
  remainingTime: null,
  startTime: 25 * 60,
  taskStartedTime: null,
}

export const timer = (state=defaultState, action) => {
  switch(action.type) {
    case 'SET_TASK_STARTED_TIME':
      return {
        ...state,
        taskStartedTime: action.time,
      }
    case actions.SET_TIMER_ACTIVE:
      return {
        ...state,
        isTimerActive: action.isActive,
      }
    case actions.SET_REMAINING_TIME:
      return {
        ...state,
        remainingTime: action.time,
      }
    case actions.RESET_TIMER:
      return {
        ...state,
        remainingTime: state.startTime
      }
    case actions.SET_START_TIME:
      return {
        ...state,
        startTime: action.startTime,
        remainingTime: action.startTime,
      }
    case actions.TOGGLE_DESKTOP_NOTIFICATION:
      return {
        ...state,
        isDesktopNotificationActive: !state.isDesktopNotificationActive
      }
    case actions.START_TIMER:
      console.log('starting from reducer');
      return {
        ...state,
        isTimerActive: true,
        remainingTime: state.startTime,
      }
    case actions.STOP_TIMER:
      console.log('stopping from reducer');
      return {
        ...state,
        isTimerActive: false,
        remainingTime: state.startTime,
      }
    default:
      return state;
  }
}
