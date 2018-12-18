import { props } from './props.mockData.js';
console.log('\n**Logs**');


const isArray = val => Array.isArray();
const isString = val => typeof val === 'string' || val instanceof String;
const isObject = val => (
  typeof val === null
    ? false
    : (typeof val === 'function') || (typeof val === 'object')
    ?
)


const res = isObject([]);
console.log(res);


test('pretty print', async () => {
  expect(true).toBe(true);
});
