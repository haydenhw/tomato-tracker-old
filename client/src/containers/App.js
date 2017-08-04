// extract nav presentational component
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory, Link  } from 'react-router';

import { routeToProjectsPage } from 'helpers/route';

import { fetchProjects, toggleProjectNagModal } from '../actions/indexActions';

class App extends Component {
  constructor() {
    super(); 
    
    this.state = {
      activeLink: 'TIMER'
    }
  }
  
  componentDidMount() {
    const { fetchProjects } = this.props;
    
    fetchProjects();
  }
  
  handleTimerLinkClick() {
    const { projects, toggleProjectNagModal } = this.props;
    
    projects.length ? hashHistory.push('/') : toggleProjectNagModal();
    this.setState({ activeLink: 'TIMER' })
  }
  
  handleProjectsLinkClck() {
    routeToProjectsPage();
    this.setState({ activeLink: 'PROJECTS' })
  }
  
  render() {
    return (
      <div>
        <nav>
          <h1 className="logo-text">PomTracker</h1>
          <ul role="nav">
            <li className="nav-link" onClick={this.handleTimerLinkClick.bind(this)}>
              <a className={`${this.state.activeLink === 'TIMER' ? 'active-link' : ''}`}>Timer</a>
            </li>
            <li className="nav-link" onClick={this.handleProjectsLinkClck.bind(this)}>
              <a className={`${this.state.activeLink === 'PROJECTS' ? 'active-link' : ''}`}>Projects</a>
            </li>
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