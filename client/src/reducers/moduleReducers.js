import * as actions from '../actions/indexActions';
import rotate from 'helpers/rotate';

export const moduleList = (state = [], action) => {
  if (action.type === actions.FETCH_MODULES_SUCCESS) {
      return {modules: action.modules};
  }
  
  return state;
}

export const draggingModule = (state = [], action) => {
  switch(action.type) {
    case actions.CHANGE_DRAGGING_MODULE:
       return action.moduleData;
       break;
      
   default:
     return state;
 }
}

export const selectedModule = (state = {}, action) => {
  switch(action.type) {
    case actions.UPDATE_SELECTED_MODULE:
       return action.moduleData;
       break;
      
   default:
     return state;
 }
}

export const moduleBank = (state = [], action) => {
  switch(action.type) {
    case actions.FECTCH_PROJECT_BY_ID_SUCCESS:
       return action.project.moduleBank;
       break;
      
   default:
     return state;
 }
}

export const currentProjectModules = (state = [], action) => {
  
  switch(action.type) {
    case actions.FECTCH_PROJECT_BY_ID_SUCCESS:
      return action.project.modules
      break;
      
    case actions.PUSH_TO_CURRENT_PROJECT_MODULES:
      return [...state, action.module]
      break;
  
    case actions.UPDATE_MODULE_POSITION:
      return state.map((module, i) => {
        const { x, y, index } = action.modulePosition;
        const updatedModuleProps = { 
          ...module, 
          x,
          y
        } 
        
        return i === index ? updatedModuleProps : module;
      });
      break;
        
    case actions.ROTATE_SELECTED_MODULE:
      console.log('hello from reducer')
    
      let { 
        rotation,
        boundToSideIndex,
        innerGroupX,
        innerGroupY,
        width,
        height,
        index
      } = action.moduleData; 
      const newCoordinates = 
        // returns an object with 90 degrees added to rotation and x and y values
        // that are adjusted to rotate the module about its center
        rotate(rotation, innerGroupX, innerGroupY, width, height); 
      if (!isNaN(boundToSideIndex)) {
        boundToSideIndex = boundToSideIndex === 3 ? 0 : boundToSideIndex + 1; 
      }
      console.log(boundToSideIndex)
      return state.map((module, i) => {
        const updatedModuleProps = { 
          ...module,
          boundToSideIndex,
          innerGroupX: newCoordinates.x,
          innerGroupY: newCoordinates.y,
          rotation: newCoordinates.rotation,
        } 
        
        return i === index ? updatedModuleProps : module;
      });
      
      
      case actions.DELETE_SELECTED_MODULE:
        const newState = [
          ...state.slice(0, action.moduleIndex),
          ...state.slice(action.moduleIndex + 1)
        ];
        return newState;
        break;
      
   default:
     return state;
 }
}
