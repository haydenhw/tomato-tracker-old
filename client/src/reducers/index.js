import * as actions from '../actions/index';
  
export const getModules = (state = [], action) => {
  
  if (action.type === actions.FETCH_MODULES_SUCCESS) {
      return {modules: action.modules};
    }
  
  return state;
}