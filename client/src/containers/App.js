// extract nav presentational component
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory, Link  } from 'react-router';
import Notification  from 'react-web-notification';

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
    const { isDesktopNotificationActive } = this.props;
    
    return (
      <div>
        <nav>
          <h1 className="logo-text">PomTracker</h1>
              <a className={`${this.state.activeLink === 'TIMER' ? 'active-link' : ''}`}
                onClick={this.handleTimerLinkClick.bind(this)}
              >
                Timer
              </a>
              <a className={`nav-link ${this.state.activeLink === 'PROJECTS' ? 'active-link' : ''}`}
                onClick={this.handleProjectsLinkClck.bind(this)}
              >
                Projects
              </a>
        </nav>
          {this.props.children}
          
      <Notification 
        title="Timer's Up!"
        ignore={!isDesktopNotificationActive}
      />  
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { projects, timer } = state;
  const { isDesktopNotificationActive } = timer;
  
  return {
    isDesktopNotificationActive,
    projects: projects.items
  }
}
export default connect(mapStateToProps, {
  fetchProjects, 
  toggleProjectNagModal
})(App);