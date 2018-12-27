import renderAppWithState from './renderAppWithState';
import nock from 'nock';

test('test', () => {
  nock('http://localhost:3002')
    .get('/projects')
    .reply(200, {foo: 'bar'});

  expect(true).toBe(true);
});
