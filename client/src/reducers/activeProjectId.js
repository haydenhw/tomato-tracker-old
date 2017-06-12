import * as actions from '../actions/indexActions';

export function activeProjectId(state=null, action) {
  switch(action.type) {
    case actions.SET_ACTIVE_PROJECT:
      return action.projectId;
  }
  
  return state;
}