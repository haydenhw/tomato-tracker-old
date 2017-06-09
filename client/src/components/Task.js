import React from 'react';
import PropTypes from 'prop-types';

import EditMenu from '../containers/EditMenu';
import store from '../redux-files/store'

export default function Task(props) {
  const { taskData } = props;
  const { taskName, recordedTime } = taskData;

  return(
    <div className="list-item">
      <span>{taskName}</span>
      <span>{recordedTime}</span>
      <EditMenu>
        <li className="dropdown-item"><a>Edit</a></li>
        <li className="dropdown-item"><a>Delete</a></li>
      </EditMenu>
    </div>
  );
}

Task.propTypes = {
  taskData: PropTypes.object.isRequired
}