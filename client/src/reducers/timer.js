import * as actions from '../actions/indexActions';

const defaultState = {
  remainingTime: 60 * 25,
  startTime: 60 * 25
}

export const timer = (state=defaultState, action) => {
  switch(action.type) {
    case actions.DECREMENT_TIME:
      return {
        ...state,
        remainingTime: state.remainingTime - 1
      }
  }
}