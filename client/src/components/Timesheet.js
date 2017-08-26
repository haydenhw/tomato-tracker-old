import React from 'react';
import PropTypes from 'prop-types';

export default function Timesheet({ buttonText, children, titleText }) {
  return(
    <div className="timesheet">
      <h2 className="timesheet-title">{titleText}</h2>
      <div className="timesheet-button-wrapper">
        <button
          className="timesheet-add-button material-button" onClick={this.handleAddTasks.bind(this)}
          >
            NEW TASKS
        </button> 
        {children}
      </div>      
  </div>
  );
}

Timesheet.propTypes = {
}
