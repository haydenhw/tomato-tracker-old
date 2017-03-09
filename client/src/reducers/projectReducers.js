import * as actions from '../actions/indexActions';

export const projectList = (state = [], action) => {
  if (action.type === actions.FETCH_PROJECTS_SUCCESS) {
      return action.projects;
  }
  
  return state;
}