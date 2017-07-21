import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteTask, toggleModal } from '../actions/indexActions'; 

import Confirm from '../components/Confirm';

function ConfirmDeleteTask(props) {
  const { payload, taskName } = props;
  return(
    <Confirm 
      onDangerClick={() => deleteTask(...payload) }
      onDangerText={`Are you sure you want to delete task ${taskName}`}
      onCancel={toggleModal}
      title={<h2>Confirm time change for task <span className="grey">{taskName}</span></h2>}
    />
  );
}

export default connect(null, { deleteTask, toggleModal })(ConfirmDeleteTask);

ConfirmDeleteTask.propTypes = {
  
}