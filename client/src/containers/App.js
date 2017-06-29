import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory, Link  } from 'react-router';

import { fetchProjects, toggleProjectNagModal } from '../actions/indexActions';

class App extends Component {
  componentDidMount() {
    const { fetchProjects } = this.props;
    
    fetchProjects()
  }
  
  handleTimerLinkClick() {
    const { projects, toggleProjectNagModal } = this.props;
    
    projects.length ? hashHistory.push('/') : toggleProjectNagModal();
  }
  
  render() {
    return (
      <div>
        <nav>
          <h1 className="logo-text">PomTracker</h1>
          <ul role="nav">
            <li className="nav-link" onClick={this.handleTimerLinkClick.bind(this)}><a>Timer</a></li>
            <li className="nav-link"><Link to="/projects">Projects</Link></li>
          </ul>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { projects } = state;
  
  return {
    projects: projects.items
  }
}
export default connect(mapStateToProps, {
  fetchProjects, 
  toggleProjectNagModal
})(App);