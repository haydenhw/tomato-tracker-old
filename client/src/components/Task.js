import React from 'react';
import PropTypes from 'prop-types';

import { secondsToHMMSS } from '../helpers/time'

import EditMenu from '../containers/EditMenu';

export default function Task(props) {
  const { taskData } = props;
  const { taskName, recordedTime } = taskData;

  return(
    <div className="list-item">
      <div className="list-item-col1 list-col">
        <span>{taskName}</span>
      </div>
      <div className="list-item-col2 list-col">
        <span>{secondsToHMMSS(recordedTime)}</span>
      </div>
      <div className="list-item-col3 list-col">
        <EditMenu className='list-item-edit-menu'>
          <li className="dropdown-item"><a>Edit</a></li>
          <li className="dropdown-item"><a>Delete</a></li>
        </EditMenu>
      </div>
    </div>
  );
}

Task.propTypes = {
  taskData: PropTypes.object.isRequired
}