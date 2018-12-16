import React from 'react';
import PropTypes from 'prop-types';

export default function Nav(props) {
  const { activeLink, handleLogLinkClick, handleTimerLinkClick, handleProjectsLinkClick } = props;

  return(
    <nav>
      <div className="nav-logo-wrapper">
        <img className="nav-logo-image" src="images/black-white-tomato-timer.png" alt="tomato timer logo"/>
        <h1 className="nav-logo-text"><span>Tomato</span><span className='nav-logo-text-bold'>Tracker</span></h1>
      </div>
          <a className={`nav-link ${activeLink === 'TIMER' ? 'active-link' : ''}`}
            onClick={handleTimerLinkClick}
          >
            Timer
          </a>
          <a className={`nav-link ${activeLink  === 'PROJECTS' ? 'active-link' : ''}`}
            onClick={handleProjectsLinkClick}
          >
            Projects
          </a>
          <a className={`nav-link ${activeLink  === 'LOG' ? 'active-link' : ''}`}
            onClick={handleLogLinkClick}
          >
            Log
          </a>
    </nav>
  );
}

Nav.propTypes = {
}
