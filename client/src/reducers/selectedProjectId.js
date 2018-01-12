import * as actions from '../actions/indexActions';

export function selectedProjectId(state=(localStorage.prevSelectedProjectId  || null), action) {
  switch(action.type) {
    case actions.SET_SELECTED_PROJECT:
      return action.projectId;
    case actions.POST_PROJECT_REQUEST:
      return action.project.shortId;
    case actions.FETCH_PROJECTS_SUCCESS:
      const doesLastSelectedProjectExist = Boolean(action.projects.find(project => project.shortId === state));

      return doesLastSelectedProjectExist ? state : action.projects[0].shortId;
    default:
      return state;
  }
}
