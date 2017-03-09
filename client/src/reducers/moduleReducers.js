import * as actions from '../actions/indexActions';

export const moduleList = (state = [], action) => {
  if (action.type === actions.FETCH_MODULES_SUCCESS) {
      return {modules: action.modules};
  }
  
  return state;
}
