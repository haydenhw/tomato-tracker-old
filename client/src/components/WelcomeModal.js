import React from 'react';
import PropTypes from 'prop-types';

import BounceInAnimationWrapper from '../containers/BounceInAnimationWrapper';

export default function WelcomeModal(props) {
  const { handleGetStartedClick } = props;
  
  return(
    <div className="welcome form">
      {/* <BounceInAnimationWrapper> */}
        <h2 className="form-title bounceInDown-appear">Welcome to PomTracker!</h2>
      {/* </BounceInAnimationWrapper> */}
      {/* <BounceInAnimationWrapper> */}
        <p>Click below to add you first project</p>
        <button className="form-button" onClick={handleGetStartedClick}>Get Started</button>
      {/* </BounceInAnimationWrapper> */}
    </div>
  );
}

WelcomeModal.propTypes = {
  handleGetStartedClick: PropTypes.func.isRequired
}
