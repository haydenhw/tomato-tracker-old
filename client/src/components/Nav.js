import React from 'react';
import PropTypes from 'prop-types';

export default function Nav(props) {
  const { activeLink, handleTimerLinkClick, handleProjectsLinkClck } = props;
  console.log(activeLink, 'from nav')
  return(
    <nav>
      <div className="logo-wrapper">
        <h1 className="logo-text">TomatoTracker</h1>
        <img className="logo-image" src="images/tomato-timer.png" alt="tomato timer logo"/>
      </div>
          <a className={`${activeLink === 'TIMER' ? 'active-link' : ''}`}
            onClick={handleTimerLinkClick}
          >
            Timer
          </a>
          <a className={`nav-link ${activeLink  === 'PROJECTS' ? 'active-link' : ''}`}
            onClick={handleProjectsLinkClck}
          >
            Projects
          </a>
    </nav>
  );
}

Nav.propTypes = {
}