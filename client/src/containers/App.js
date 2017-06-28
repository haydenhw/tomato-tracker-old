import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { fetchProjects } from '../actions/indexActions';

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    
    dispatch(fetchProjects());
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

export default connect()(App);