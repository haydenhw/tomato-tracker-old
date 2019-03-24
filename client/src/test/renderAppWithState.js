import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import AppRoot from '../containers/AppRoot';
import  store from '../redux-files/store';
// store.dispatch({
//   type: "FETCH_PROJECTS_SUCCESS",
//   projects: [],
// });

export default function renderAppWithState() {
  const location = { pathname: '/' };
  const wrapper = mount(
    <Provider store={store}>
      <AppRoot />
    </Provider>
  );
  return wrapper;
}
