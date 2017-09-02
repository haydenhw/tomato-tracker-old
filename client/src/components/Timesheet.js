import React from 'react';
import PropTypes from 'prop-types';

export default function Timesheet({ buttonText, children, handleButtonClick, titleText }) {
  return(
    <div className="timesheet">
      <h2 className="timesheet-title">{titleText}</h2>
      <div className="timesheet-button-wrapper">
        <button
          className="timesheet-add-button material-button" onClick={handleButtonClick}
          >
            {buttonText}  
        </button> 
      </div>      
      {children}
  </div>
  );
}

Timesheet.propTypes = {
}
