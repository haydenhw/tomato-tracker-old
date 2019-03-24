import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import AppRoot from './containers/AppRoot';
import store from './redux-files/store';

import './helpers/polyfill.js';
import './styles/index.scss';
import './styles/icons/fonts/style.css';

render(
  <Provider store={store}>
    <AppRoot />
  </Provider>,
document.getElementById('root'));
