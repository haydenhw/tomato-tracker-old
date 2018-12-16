import * as actions from '../actions/indexActions';

const defaultState = {
  entries: [],
}

export function log(state=defaultState, action) {
  switch(action.type) {
    case actions.FETCH_ENTRIES_SUCCESS:
      return {
        ...state,
        entries: action.entries,
      }
    case actions.ADD_ENTRY:
      return {
        ...state,
        entries: [action.newEntry, ...state.entries],
      }
    default:
      return state;
  }
}
