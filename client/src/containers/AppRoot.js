import React from 'react';
import { IndexRoute, Router, Route, hashHistory } from 'react-router'
import App from './App';
import AddProjectPage from './AddProjectPage';
import EditProjectPage  from './EditProjectPage';
import ProjectsPage from './ProjectsPage';
import TimeTrackerPage from './TimeTrackerPage';


const AppRoot = () => (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={TimeTrackerPage}/>
      <Route path="/projects" component={ProjectsPage}/>
      <Route path="/projects/new" component={AddProjectPage}/>
      <Route path="/projects/:projectId" component={EditProjectPage}/>
      <Route path="/log" component={() => <h1>Log Feature Has Been Removed</h1>} />
    </Route>
  </Router>
);

export default AppRoot;
