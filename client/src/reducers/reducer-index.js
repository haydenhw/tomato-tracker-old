import * as actions from '../actions/action-index';
  
export const moduleList = (state = [], action) => {
  
  if (action.type === actions.FETCH_MODULES_SUCCESS) {
      return {modules: action.modules};
    }
  
  return state;
}

const defaultBoardDimensions = {
  width: 600,
  height: 300
}
export const boardDimesnions = (state = defaultBoardDimensions, action) => {

  if (action.type === actions.UPDATE_BOARD_DIMENSIONS) {
      return {boardDimesnions: action.dimensions};
    }

  return state;
}