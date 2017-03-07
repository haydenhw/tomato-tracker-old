import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import { Provider } from 'react-redux';
import App from './App';
import SelectMoudles from './SelectMoudles';
import store from './store';

ReactDOM.render(
  <Provider store={ store }>
    <Router history={hashHistory}>
      <Route path="/" component ={SelectMoudles}/>
      <Route path="/app" component={App}/> 
    </Router>
  </Provider>,
  document.getElementById('root')
);
