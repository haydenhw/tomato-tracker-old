import axios from 'axios';

import * as actions from '../actions/indexActions';
import { getActiveTask, getTaskStartedTime, getSelectedTaskId, getSelectedProject } from '../selectors';
import { call, fork, put, takeEvery, takeLatest, select } from 'redux-saga/effects';

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

export function* setTaskStartedTime(setToNow) {
    yield put({
    type: 'SET_TASK_STARTED_TIME',
    time: setToNow ? new Date().getTime() : null,
   });
}

export function* logEntry() {
  const state = yield select();
  const selectedTaskId = getSelectedTaskId(state);
  const newLog = yield call(createEntry, state, selectedTaskId);
  yield put({ type: 'ADD_ENTRY', newLog });
}

export function* logEntryOnTimerToggle() {
  const state = yield select();
  const { isTimerActive } = state.timer;

  if (isTimerActive) {
    yield call(setTaskStartedTime, true);
  } else {
    yield call(logEntry);
    yield call(setTaskStartedTime);
  }
}

export function* logEntryOnTimerComplete() {
    yield call(logEntry);
    yield call(setTaskStartedTime);
}

export function* logEntryOnTaskChange() {
    yield call(logEntry);
    yield call(setTaskStartedTime, true);
}

async function requestLogs() {
  const { data } = await axios.get('log');
  return data;
}

export function* fetchLogs() {
    const logs = yield call(requestLogs);
    yield put({
      type: 'FETCH_LOGS_SUCCESS',
      logs
    });
}

export default function* rootSaga() {
  yield takeEvery('TOGGLE_TIMER', logEntryOnTimerToggle);
  yield takeEvery('HANDLE_TIMER_COMPLETE', logEntryOnTimerComplete);
  yield takeEvery('SET_START_TIME', setTaskStartedTime);
  yield takeEvery('SET_SELECTED_TASK_ID', logEntryOnTaskChange);
  yield fork(fetchLogs);
}
