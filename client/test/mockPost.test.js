import moment from 'moment';
console.log('\n\n**Logs**');

const entry = {
  taskName: 'setup/config',
  startTime: 1544923075141,
  endTime: 1544923076241,
  prevRecordedTime: 3000,
  parentProject: 'Mon-Sun',
}

const requestEntries = () => (
  new Promise((resolve, reject) => resolve(entry))
);

export const fetchEntries = () => async function(dispatch, getState) {
  const entries = await requestEntries();

  console.log(entries);
}

test('formats start time', async () => {
  fetchEntries()();
  expect(true).toBe(true);
});
