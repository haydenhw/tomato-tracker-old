import React, { Component } from 'react';
import { Link } from 'react-router';

import { fetchProjects } from '../actions/indexActions';
import store from '../redux-files/store';

export default class App extends Component {
  componentDidMount() {
    store.dispatch(fetchProjects());
  }
  
  render() {
    return (
      <div>
        <nav>
          <h1 className="logo-text">PomTracker</h1>
          <ul role="nav">
            <li className="nav-link"><Link to="/">Timer</Link></li>
            <li className="nav-link"><Link to="/projects">Projects</Link></li>
          </ul>
        </nav>
        {this.props.children}
      </div>
    );
  }
}
