import * as actions from '../actions/action-index';
  
export const moduleList = (state = [], action) => {
  
  if (action.type === actions.FETCH_MODULES_SUCCESS) {
      return {modules: action.modules};
  }
  
  return state;
}

export const projectList = (state = [], action) => {
  
  if (action.type === actions.FETCH_PROJECTS_SUCCESS) {
      return {modules: action.modules};
  }
  
  return state;
}

const defaultboardSpecs = {
  x:10,
  y:10,
  width: 600,
  height: 300
}
export const boardSpecs = (state = defaultboardSpecs, action) => {

   switch(action.type) {
     case actions.UPDATE_BOARD_DIMENSIONS:
        return {
          ...state,
          width: action.dimensions.width,
          height: action.dimensions.height,
        };
        break;
    case actions.UPDATE_BOARD_POSITION:
       return {
         ...state,
         x: action.position.x,
         y: action.position.y,
       };
       
    default:
      return state;
  }
}