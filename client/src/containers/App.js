// extract nav presentational component
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Notification from 'react-web-notification';

import { routeToLogPage, routeToProjectsPage, routeToTimerPage, } from 'helpers/route';

import {
  changeActiveLink,
  fetchProjects,
  handleKeyDown,
  handleTimerComplete,
  incrementTaskTime,
  toggleProjectNagModal,
  setTimerActive,
  setRemainingTime,
  setSelectedProject,
  setSelectedTaskId,
} from '../actions/indexActions';

import io from 'socket.io-client';
import Nav from '../components/Nav';

class App extends Component {
  constructor() {
    super();

    this.state = {
      showNotification: true
    };
  }

  initTimerSocket() {
    const {
      setRemainingTime,
      setTimerActive,
      incrementTaskTime,
      handleTimerComplete,
      setSelectedProject,
      setSelectedTaskId
    } = this.props;

    const socket = io('/data');

    socket.on('module', (timeData) => {
      const { isTimerActive, projects, } = this.props;
      const { remainingTime, projectId, taskId, } = timeData;

      const activeProject = projects.find(project => project._id === projectId);
      const activeTask = activeProject.tasks.find(task => task._id === taskId);

      setRemainingTime(remainingTime);
      incrementTaskTime(activeProject, activeTask);
      setSelectedProject(activeProject.shortId);
      setSelectedTaskId(activeTask.shortId);

      if (!isTimerActive) {
        setTimerActive(true);
      }

      if (remainingTime <1 ) {
        handleTimerComplete();
      }
    });
  }

  componentDidMount() {
    const { fetchProjects, handleKeyDown } = this.props;
    document.onkeydown = handleKeyDown;
    this.initTimerSocket();
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
          activeLink={isProjectRoute ? 'PROJECTS' : isLogRoute ? 'LOG' : 'TIMER'}
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
  const { isTimerActive, isDesktopNotificationActive } = timer;

  return {
    isDesktopNotificationActive,
    isTimerActive,
    projects: projects.items,
  };
};

export default connect(mapStateToProps, {
    changeActiveLink,
    fetchProjects,
    handleKeyDown,
    handleTimerComplete,
    incrementTaskTime,
    setRemainingTime,
    setTimerActive,
    setSelectedProject,
    setSelectedTaskId,
    toggleProjectNagModal
  }
)(App);
