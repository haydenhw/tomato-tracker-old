import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateTask, toggleEditTaskForm } from '../actions/indexActions'; 

import Confirm from '../components/Confirm';

function ConfirmEditTask(props) {
  const { updateTask, oldTime, newTime, payload, taskName, toggleEditTaskForm } = props;
  return(
    <Confirm 
      onDangerClick={() => updateTask(...payload) }
      onDangerText={`Are you sure you want to change the logged time from ${oldTime} to ${newTime}?`}
      onCancel={toggleEditTaskForm}
      title={<h2>Confirm time change for task <span className="grey">{taskName}</span></h2>}
    />
  );
}

export default connect(null, { updateTask, toggleEditTaskForm })(ConfirmEditTask);

ConfirmEditTask.propTypes = {
  
}