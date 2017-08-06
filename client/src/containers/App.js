// extract nav presentational component
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import Notification  from 'react-web-notification';
import { RouteTransition } from 'react-router-transition';

import { spring } from 'react-motion';

import { routeToProjectsPage, routeToTimerPage } from 'helpers/route';
import { changeActiveLink, fetchProjects, toggleProjectNagModal } from '../actions/indexActions';

import Nav from '../components/Nav';

const fadeConfig = { stiffness: 200, damping: 22 };
const popConfig = { stiffness: 360, damping: 25 };
const slideConfig = { stiffness: 330, damping: 30 };

const slideLeft = {
  atEnter: {
    opacity: 0,
    offset: 100,
  },
  atLeave: {
    opacity: spring(0, fadeConfig),
    offset: spring(-100, slideConfig),
  },
  atActive: {
    opacity: spring(1, slideConfig),
    offset: spring(0, slideConfig),
  },
  mapStyles(styles) {
    return {
      opacity: styles.opacity,
      transform: `translateX(${styles.offset}%)`,
    };
  },
};

class App extends Component {
  constructor() {
    super(); 
    
    this.state = {
      activeLink: 'TIMER',
      showNotification: true
    }
  }
  
  componentDidMount() {
    const { fetchProjects } = this.props;
    
    fetchProjects();
  }
  
  handleTimerLinkClick() {
    const {  projects, toggleProjectNagModal } = this.props;
    
    projects.length ? routeToTimerPage() : toggleProjectNagModal();
  }
  
  
  render() {
    const { activeLink, isDesktopNotificationActive } = this.props;
    
    return (
      <div>
        <Nav
          activeLink={activeLink}
          handleTimerLinkClick={this.handleTimerLinkClick.bind(this)} 
          handleProjectsLinkClck={routeToProjectsPage}
        /> 
        <div className="pt-perspective">
          {this.props.children}
        </div>
        {isDesktopNotificationActive
          && <Notification 
            title="Time's Up!"
            ignore={false}
            options={{icon: 'images/tomato-timer.png'}}
          />}
        }  
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { nav, projects, timer } = state;
  const { activeLink } = nav;
  const { isDesktopNotificationActive } = timer;
  
  return {
    activeLink,
    isDesktopNotificationActive,
    projects: projects.items
  }
}

export default connect(mapStateToProps, {
  changeActiveLink,
  fetchProjects, 
  toggleProjectNagModal
}
)(App);