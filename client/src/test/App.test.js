// import 'jsdom';
// import 'jsdom-global/register';
// import 'isomorphic-fetch';
// // import 'raf/polyfill';
// import Enzyme from 'enzyme';
// import Adapter from 'enzyme-adapter-react-15';
// import TimeTracker from '../containers/TimeTracker';
// import fetchMock from 'fetch-mock';
// import { getFakeProjectArray } from './mockData/mockDataUtils';
// import renderAppWithState from './renderAppWithState';
// import { projectsUrl } from '../helpers/endpointHelpers';
//
// Enzyme.configure({ adapter: new Adapter() });
//
// const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));
//
// test('test', () => {
//     fetchMock.mock(projectsUrl, { projects: getFakeProjectArray(2, 1, 3) });
//     const wrapper = renderAppWithState();
//
//     return Promise.resolve(getFakeProjectArray(2, 1, 3)).then(() => {
//       wrapper.update();
//       const ttWrapper = wrapper.find('TimeTracker');
//
//       const props = ttWrapper.instance().props();
//       console.log(props)
//       expect(true).toBe(false);
//     });
// });
