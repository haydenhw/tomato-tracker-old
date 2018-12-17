import * as actions from '../actions/indexActions';

export function selectedTaskId(state=null, action) {
  switch(action.type) {
    case actions.SET_SELECTED_TASK_ID:
      return action.taskId;
    default:
      return state;
  }
}
