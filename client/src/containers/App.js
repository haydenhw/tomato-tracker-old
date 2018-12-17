// extract nav presentational component
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notification  from 'react-web-notification';

import { routeToLogPage, routeToProjectsPage, routeToTimerPage, } from 'helpers/route';

import {
  changeActiveLink,
  fetchProjects,
  fetchEntries,
  handleKeyDown,
  toggleProjectNagModal
} from '../actions/indexActions';

import Nav from '../components/Nav';

class App extends Component {
  constructor() {
    super();

    this.state = {
      showNotification: true
    }
  }


  componentDidMount() {
    const { fetchProjects, handleKeyDown } = this.props;

    document.onkeydown = handleKeyDown;
    fetchProjects();
  }

  render() {
    const { isDesktopNotificationActive, location } = this.props;
    const pathName = location.pathname;
    const isProjectRoute = /projects/.test(pathName);
    const isLogRoute = /log/.test(pathName);

    return (
      <div>
        <Nav
          activeLink={isProjectRoute ? 'PROJECTS' :  isLogRoute ? 'LOG' : 'TIMER'}
          handleTimerLinkClick={routeToTimerPage}
          handleProjectsLinkClick={routeToProjectsPage}
          handleLogLinkClick={routeToLogPage}
          isProjectRoute={isProjectRoute}
        />
        {this.props.children}
        {isDesktopNotificationActive
          && <Notification
            timeout={40000}
            title="Time's Up!"
            ignore={false}
            options={{ icon: 'images/tomato-timer.png' }}
          />}
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
  changeActiveLink,
  fetchProjects,
  fetchEntries,
  handleKeyDown,
  toggleProjectNagModal
}
)(App);
