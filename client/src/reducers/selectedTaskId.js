import * as actions from '../actions/indexActions';

const defaultState = {
  current: null,
  last: null,
}

export function selectedTaskId(state=defaultState, action) {
  switch(action.type) {
    case actions.SET_SELECTED_TASK_ID:
      return {
        current: action.taskId,
        last: state.current,
      }
    default:
      return state;
  }
}
