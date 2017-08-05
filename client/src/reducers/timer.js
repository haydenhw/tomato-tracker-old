import * as actions from '../actions/indexActions';

const defaultState = {
  intervalId: null,
  isTimerActive: false,
  isDesktopNotificationActive: false,
  remainingTime: null,
  startTime: 25 * 60,
}

export const timer = (state=defaultState, action) => {
  switch(action.type) {
    // case actions.START_TIMER:
    // return {
    //   ...state,
    //   remainingTime: state.startTime,
    //   isTimerActive: !state.isTimerActive,
    // }
    // case actions.TOGGLE_IS_TIMER_ACTIVE:
    //   return {
    //     ...state,
    //     isTimerActive: !state.isTimerActive,
    //   }
    case actions.DECREMENT_TIMER:
      return {
        ...state,
        remainingTime: state.remainingTime - 1
      }
    case actions.RESET_TIMER:
      return {
        ...state,
        remainingTime: state.startTime 
      }
    case actions.SET_INTERVAL_ID: 
      return {
        ...state,
        intervalId: action.intervalId 
      }
    case actions.SET_START_TIME:
      return {
        ...state,
        isTimerActive: action.shouldToggleTimer ? !state.isTimerActive : state.isTimerActive,  
        startTime: action.startTime,
        remainingTime: action.startTime 
        
      }
    case actions.TOGGLE_TIMER:
      return {
        ...state,
        isTimerActive: !state.isTimerActive,  
        remainingTime: state.startTime 
      }
    default:
      return state;
  }
}