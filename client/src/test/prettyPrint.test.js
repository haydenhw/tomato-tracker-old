import { mockState } from './mockState';

const sampleEntry = {
  taskName: 'setup/config',
  startTime: 1544923075141,
  endTime: 1544923076241,
  prevRecordedTime: 3000,
  parentProjectName: 'Mon-Sun',
}

const prettyPrint = obj => JSON.stringify(obj, null, 2);
console.log(prettyPrint(mockState));
test('pretty print', async () => {
  expect(true).toBe(true);
});
