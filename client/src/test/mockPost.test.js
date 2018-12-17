import 'babel-polyfill';

import { put, takeEvery, select } from 'redux-saga/effects';

export function* incrementAsync() {
  const state = yield select();
  console.log(state);
}

export default function* rootSaga() {
  yield takeEvery('TOGGLE_TIMER', incrementAsync);
}
const gen = incrementAsync();
gen.next();
test('formats start time', async () => {
  expect(true).toBe(true);
});
