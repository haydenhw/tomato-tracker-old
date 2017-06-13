import * as actions from '../actions/indexActions';

export function activeProjectId(state=null, action) {
  switch(action.type) {
    case actions.SET_ACTIVE_PROJECT:
      return action.projectId;
    case actions.ADD_PROJECT:
      return action.project.shortId;
    default:
      return state;
  }
}