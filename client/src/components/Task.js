import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import { secondsToHMMSS } from '../helpers/time'

import ContextMenu from '../containers/ContextMenu';

export default function Task(props) {
  const { taskData } = props;
  const { taskName, recordedTime } = taskData;

  return(
    <div className="list-item">
      <div className="list-item-col list-item-col1">
          <FontAwesome className="gear-icon" name='gear'></FontAwesome>  
      </div>
      <div className="list-item-col list-item-col2">
        <h2>{taskName}</h2>
        <div>{secondsToHMMSS(recordedTime)}</div>
      </div>
      <div className="list-item-col list-item-col3">
        <FontAwesome className="gear-icon" name='gear'></FontAwesome>  
      </div>
      {/* <div className="list-item-col list-item-col4">
        <ContextMenu className='list-item-context-menu'>
          <li className="dropdown-item"><a>Edit</a></li>
          <li className="dropdown-item"><a>Delete</a></li>
        </ContextMenu>
      </div> */}
    </div>
  );
}

Task.propTypes = {
  taskData: PropTypes.object.isRequired
}