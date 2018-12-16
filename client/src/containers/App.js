// extract nav presentational component
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notification  from 'react-web-notification';

import { routeToProjectsPage, routeToTimerPage } from 'helpers/route';
import { changeActiveLink, fetchProjects, fetchEntries, handleKeyDown, toggleProjectNagModal } from '../actions/indexActions';

import Nav from '../components/Nav';

class App extends Component {
  constructor() {
    super();

    this.state = {
      showNotification: true
    }
  }


  componentDidMount() {
    const { fetchProjects, fetchEntries, handleKeyDown } = this.props;

    document.onkeydown = handleKeyDown;
    fetchEntries();
    fetchProjects();
  }

  render() {
    const { isDesktopNotificationActive, location } = this.props;
    const pathName = location.pathname;
    const isProjectRoute = /projects/.test(pathName);

    return (
      <div>
        <Nav
          activeLink={isProjectRoute ? 'PROJECTS' : 'TIMER'}
          handleTimerLinkClick={routeToTimerPage}
          handleProjectsLinkClck={routeToProjectsPage}
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
