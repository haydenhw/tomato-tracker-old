import { getActiveTask, getTaskStartedTime, getSelectedProject } from '../selectors';
import { entries } from '../components/Log.mockdata.js';

const requestEntries = () => (
  new Promise((resolve, reject) => resolve(entries))
);

export const FETCH_ENTRIES_SUCCESS = "FETCH_ENTRIES_SUCCESS";
export const fetchEntries = () => async function(dispatch, getState) {
  const entries = await requestEntries();
  dispatch({
    type: FETCH_ENTRIES_SUCCESS,
    entries: entries,
  });
}

const prettyPrint = obj => JSON.stringify(obj, null, 2);

const createEntry = (state, selectedTaskId) => {
  const {
    taskName,
    recordedTime,
  } = getActiveTask(state, selectedTaskId);
  const startTime = getTaskStartedTime(state);
  const endTime = new Date().getTime();
  const parentProjectName = getSelectedProject(state).projectName;

  return {
    taskName,
    startTime,
    endTime,
    recordedTime,
    parentProjectName,
  }
}

export const ADD_ENTRY = "ADD_ENTRY";
export const addEntry = (selectedTaskId) => (dispatch, getState) => {
  const state = getState();
  const newEntry = createEntry(state, selectedTaskId);

  dispatch({
    type: ADD_ENTRY,
    newEntry,
  });
}
