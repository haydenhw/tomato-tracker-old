import * as actions from '../actions/indexActions';

const defaultMouseEvents = {
  mouseDownOnIcon: false,
  isMouseDown: false,
  isMouseOverIcon: false
}

export const mouseEvents = (state = defaultMouseEvents, action) => {
  switch(action.type) {
    case actions.MOUSE_DOWN_ON_ICON:
      return {
        ...state,
        mouseDownOnIcon: action.isDown
      }
      break;
      
    case actions.TOGGLE_IS_MOUSE_DOWN:
      return {
        ...state,
        isMouseDown: !state.isMouseDown
      }
      break;
      
      case actions.TOGGLE_IS_MOUSE_OVER_MODULE:
        return {
          ...state,
          isMouseOverIcon: !state.isMouseOverIcon
        }
        break;
        
    default:
      return state;
  }
}