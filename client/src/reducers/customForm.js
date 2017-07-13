import * as actions from '../actions/indexActions';

const defaultState = {
  shouldSubmitProjectForm: false
}

export function customForm(state=defaultState, action) {
  switch(action.type) {
    case "TOGGLE_SHOULD_SUBMIT_PROJECT_FORM":
      return {
        shouldSubmitProjectForm: !state.shouldSubmitProjectForm
      } 
    default:
      return state;
  }
}
