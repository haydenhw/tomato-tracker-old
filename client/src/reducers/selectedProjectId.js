import * as actions from '../actions/indexActions';

const afterFetchState = (projects) => {
  if (projects.length === 0)
    return null

  if (localStorage.selectedProjectId)
    return localStorage.selectedProjectId

  return projects[0].shortId
}

export function selectedProjectId(state=null, action) {
  switch(action.type) {
    case actions.SET_SELECTED_PROJECT:
      return action.projectId;
    case actions.POST_PROJECT_REQUEST:
      return action.project.shortId;
    case actions.FETCH_PROJECTS_SUCCESS:
      return afterFetchState(action.projects)
    default:
      return state;
  }
}
