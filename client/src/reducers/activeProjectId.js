import * as actions from '../actions/indexActions';

export function activeProjectId(state=null, action) {
  switch(action.type) {
    case actions.SET_ACTIVE_PROJECT:
      return action.projectId;
    case actions.POST_PROJECT_REQUEST:
      return action.project.shortId;
    case actions.FETCH_PROJECTS_SUCCESS:
      return state ? state : action.projects[0].shortId;
    default:
      return state;
  }
}