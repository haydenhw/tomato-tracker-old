import * as actions from '../actions/indexActions';

export const projectList = (state = [], action) => {
  if (action.type === actions.FETCH_PROJECTS_SUCCESS) {
      return action.projects;
  }
  
  return state;
}

export const currentProjectInfo = (state = {}, action) => {
  if (action.type === actions.FECTCH_PROJECT_BY_ID_SUCCESS) {
      return {
        name: action.project.name,
        id: action.project._id
      }
  }
  
  return state;
}