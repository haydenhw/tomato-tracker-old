import 'jsdom';
import 'jsdom-global/register';
import "isomorphic-fetch";
import nock from 'nock';
import renderAppWithState from './renderAppWithState';

test('test', () => {
  console.log(process.env.BROWSER)
  const [store, wrapper] = renderAppWithState();
  const state = store.getState();
  nock('http://localhost:3002/projects')
    .reply(200, { projects : {} });

  expect(true).toBe(true);
});
