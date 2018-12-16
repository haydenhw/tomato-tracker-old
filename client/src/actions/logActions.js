import { entries } from '../components/Log.mockdata.js';

const requestEntries = () => (
  new Promise((resolve, reject) => resolve(entries))
);

export const FETCH_ENTRIES_SUCCESS = "FETCH_ENTRIES_SUCCESS";
export const fetchEntries = () => async function(dispatch, getState) {
  const entries = await requestEntries();
  dispatch({
    type: "FETCH_ENTRIES_SUCCESS",
    entries: entries,
  });
}
