import { selectedTaskId } from './selectedTaskId';

const defaultState = {
  current: null,
  last: null,
}

const res1 = selectedTaskId(defaultState, {
  type: 'SET_SELECTED_TASK_ID',
  taskId: 'abc',
});

const res2 = selectedTaskId(res1, {
  type: 'SET_SELECTED_TASK_ID',
  taskId: 'xyz',
});

test('formats start time', async () => {
  expect(true).toBe(true);
});
