import * as actions from '../actions/indexActions';

const defaultState = {
  activeLink: 'TIMER'
}

export function nav(state=defaultState, action) {
  switch(action.type) {
    case actions.CHANGE_ACTIVE_LINK:
      return action.activeLink;
    default:
      return state;
  }
}