import * as actions from '../actions/indexActions';

const defaultMouseEvents = {
  mouseDownOnIcon: false
}

export const mouseEvents = (state = defaultMouseEvents, action) => {
  switch(action.type) {
    case actions.MOUSE_DOWN_ON_ICON:
      return {
        ...state,
        mouseDownOnIcon: action.isDown
      }
      break;
    
    default:
      return state;
  }
}