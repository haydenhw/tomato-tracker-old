import * as actions from '../actions/indexActions';

const defaultState = {
  remainingTime: 10,
  startTime: 10
}

export const timer = (state=defaultState, action) => {
  switch(action.type) {
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
  }
  
  return state;
}