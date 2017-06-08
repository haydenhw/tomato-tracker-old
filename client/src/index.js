import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import shortid from 'shortid';

import App from './containers/App';
import ProjectsPage from './containers/ProjectsPage';
import TimeTrackerPage from './containers/TimeTrackerPage';
import './index.scss';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/timer" component={TimeTrackerPage}/>
      <Route path="/projects" component={ProjectsPage}/>
    </Route>  
  </Router>
),document.getElementById('root'));

