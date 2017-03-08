import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import { Provider } from 'react-redux';
import DesignTool from './components/DesignTool';
import SelectMoudles from './components/SelectMoudles';
import store from './store';

ReactDOM.render(
  <Provider store={ store }>
    <Router history={hashHistory}>
      <Route path="/design" component={DesignTool}/> 
      <Route path="/*" component ={SelectMoudles}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
