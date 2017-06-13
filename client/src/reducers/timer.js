import * as actions from '../actions/indexActions';

const defaultState = {
  isTimerActive: false,
  remainingTime: null,
  startTime: 10
}

export const timer = (state=defaultState, action) => {
  switch(action.type) {
    case actions.TOGGLE_IS_TIMER_ACTIVE:
      return {
        ...state,
        isTimerActive: !state.isTimerActive,
        remainingTime: state.startTime,
      }
    case actions.DECREMENT_TIMER:
      return {
        ...state,
        remainingTime: state.remainingTime - 1
      }
    case actions.SET_START_TIME:
      return {
        ...state,
        startTime: action.startTime
      }
    default:
      return state;
  }
}