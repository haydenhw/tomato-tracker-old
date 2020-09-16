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
import store from 'reduxFiles/store';
import Nav from '../components/Nav';
import { secondsToMSS } from '../helpers/time';

const isTodayPDT = (dateObj) => {
  const offsetPDT = -7 * 60 * 60 * 1000;
  dateObj = new Date(dateObj.getTime() + offsetPDT);
  let now = new Date();
  now = new Date(now.getTime() + offsetPDT);
  const day = now.getDay();
  const month = now.getMonth();
  const year = now.getYear();

  return (
    dateObj.getDay() === day &&
    dateObj.getMonth() === month &&
    dateObj.getYear() === year
  );
};

const lastWindowFocus = {
  getDateObj() {
    return new Date(+localStorage.getItem('lastWindowFocus'))
  },
  set() {
    localStorage.setItem('lastWindowFocus', Date.now())
  }
};


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

    // TODO refactor this using clean code principles
    socket.on('module', (timeData) => {
      const { isTimerActive, isBackendTimerActive, projects } = this.props;
      const { remainingTime, projectId, taskId } = timeData;

      const activeProject = projects.find(project => project._id === projectId);
      const activeTask = activeProject.tasks.find(task => task._id === taskId);

      document.title = secondsToMSS(remainingTime);
      setRemainingTime(remainingTime);
      incrementTaskTime(activeProject, activeTask);
      setSelectedProject(activeProject.shortId);
      setSelectedTaskId(activeTask.shortId);

      if (!isBackendTimerActive) {
        store.dispatch({ type: 'ACK_BACKEND_TIMER_INIT' });
        const audio = new Audio('sound/success.ogg');
        audio.play();
      }

      if (!isTimerActive) {
        setTimerActive(true);
      }

      if (remainingTime === 0 && isTimerActive) {
        handleTimerComplete();
      }
    });

    socket.on('error', (err) => {
      alert(err);
    });
  }

  bindWindowFocusListener(callback) {
    window.addEventListener('focus', callback)
  }

  fetchAndDisplayDailyProjectOnFirstDailyFocus() {
    const fetchAndDisplayDailyProject = (dependencies) => {
    };

    const { setSelectedProject, fetchProjects } = this.props;
    // change this to not
    if (isTodayPDT(lastWindowFocus.getDateObj())) {
      fetchAndDisplayDailyProject()
    }
  };

  componentDidMount() {

    this.testStuff();
    const { fetchProjects, handleKeyDown } = this.props;
    document.onkeydown = handleKeyDown;
    this.initTimerSocket();
    this.bindWindowFocusListener(this.fetchAndDisplayDailyProjectOnFirstDailyFocus);
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
  const { isTimerActive, isDesktopNotificationActive, isBackendTimerActive } = timer;

  return {
    isDesktopNotificationActive,
    isBackendTimerActive,
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
