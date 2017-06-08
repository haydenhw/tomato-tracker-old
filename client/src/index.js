import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, hashHistory } from 'react-router'
import { Provider } from 'react-redux';

import store from './redux-files/store';
 
import App from './containers/App';
import ProjectsPage from './containers/ProjectsPage';
import TimeTrackerPage from './containers/TimeTrackerPage';
import './index.scss';

render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={TimeTrackerPage}/>
        <Route path="/projects" component={ProjectsPage}/>
      </Route>  
    </Router>
  </Provider>
),document.getElementById('root'));

