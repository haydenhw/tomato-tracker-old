import { projectUrls } from './endpointHelpers';

test('env test', () => {
  const actual = projectUrls.test;
  const expected = 'http://localhost:3002/projects';
  expect(actual).toBe(expected);
});

test('env development', () => {
  const actual = projectUrls.development;
  const expected = 'projects';
  expect(actual).toBe(expected);
});

test('env production', () => {
  const actual = projectUrls.development;
  const expected = 'projects';
  expect(actual).toBe(expected);
});
