import { getFakeProjectArray, generateArray, } from '../mockDataUtils';
const util = require('util')

const getRandomInteger = (min, max) => () => (
  Math.floor(Math.random() * (max - min) + min)
);

test('test generate project array with tasks', () => {
  const actual = getFakeProjectArray(3, 1, 3);
  const firstElement = actual[0];
  const {
    projectName,
    tasks,
  } = firstElement;

  expect(actual.length).toBe(3);
  expect(tasks.length).toBeGreaterThan(0);
  expect(tasks.length).toBeLessThan(3);
  expect(typeof projectName).toBe('string');
});

test('generate Array', () => {
  const dataFactory = () => ({
    foo: 'bar',
    biz: 'bang',
  });

  const specificLengthResult = generateArray(dataFactory)(3);
  const randomLengthResult = generateArray(dataFactory)(() => getRandomInteger(1,3));

  const { foo } = specificLengthResult[1];

  expect(specificLengthResult.length).toBe(3);
  expect(typeof foo).toBe('string');

  expect(Number.isInteger(randomLengthResult.length)).toBe(true);
  expect(randomLengthResult.length).toBeLessThan(4);
});
