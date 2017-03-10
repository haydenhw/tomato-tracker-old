import * as actions from '../actions/indexActions';

export const moduleList = (state = [], action) => {
  if (action.type === actions.FETCH_MODULES_SUCCESS) {
      return {modules: action.modules};
  }
  
  return state;
}

export const currentProjectModules = (state = [], action) => {
  
  switch(action.type) {
    case actions.FECTCH_PROJECT_BY_ID_SUCCESS:
       return action.project.modules
       break;
  
  case actions.UPDATE_MODULE_POSITION:
  console.log(action.modulePosition)
    const { x, y, index } = action.modulePosition; 
    console.log(y )
    return state.map((module, i) => {
      return i === index ? 
        {...module, 
          x: x,
          y: y
        } :
        module;
    })
      
    
      
   default:
     return state;
 }
}
