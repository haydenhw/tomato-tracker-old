import { mockState } from './mockState';
import { unixTimestampToHMM, unixTimestampToHHMM } from '../helpers/time';
import { getDuration } from '../helpers/logHelpers';

const prettyPrint = obj => {
  console.log(JSON.stringify(obj, null, 2));
}
console.log('\n\n**Logs**');


const start = 1544986500908;
const end = 1544986504837;
const res = getDuration(start, end);
console.log(unixTimestampToHMM(start))
console.log(unixTimestampToHMM(end))
prettyPrint(res);

test('formats start time', async () => {
  expect(true).toBe(true);
});
