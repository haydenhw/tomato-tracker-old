import * as actions from '../actions/indexActions';

const defaultState = {
  isTimerActive: false,
  remainingTime: null,
  startTime: 25 * 60
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
    case actions.TOGGLE_TIMER:
      return {
        ...state,
        isTimerActive: !state.isTimerActive,  
        // startTime: action.startTime,
        remainingTime: state.startTime 
        
      }
    default:
      return state;
  }
}