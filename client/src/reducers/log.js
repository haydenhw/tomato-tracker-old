import * as actions from '../actions/indexActions';

const defaultState = {
  logs: [],
}

export function log(state = defaultState, action) {
  switch(action.type) {
    case 'FETCH_LOGS_SUCCESS':
      return {
        ...state,
        logs: action.logs,
      }
    case actions.ADD_LOG:
      return {
        ...state,
        logs: [action.newLog, ...state.logs],
      }
    default:
      return state;
  }
}
