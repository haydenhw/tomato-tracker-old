import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import App from '../containers/App';
import Enzyme  from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import  store from '../redux-files/store';
Enzyme.configure({ adapter: new Adapter() });

export default function renderAppWithState() {
  const location = { pathname: '/project/' };
  const wrapper = mount(
    <Provider store={store}>
      <App location={location} />
    </Provider>
  );
  return [store, wrapper];
}
