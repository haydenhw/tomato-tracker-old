import React from 'react';
import PropTypes from 'prop-types';

export default function Nav(props) {
  const { activeLink, handleTimerLinkClick, handleProjectsLinkClck } = props;
  
  return(
    <nav>
      <div className="nav-logo-wrapper">
        <img className="nav-logo-image" src="images/black-white-tomato-timer.png" alt="tomato timer logo"/>
        <h1 className="nav-logo-text"><span>Pom</span><span className='nav-logo-text-bold'>Tracker</span></h1>
      </div>
          <a className={`nav-link ${activeLink === 'TIMER' ? 'active-link' : ''}`}
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