import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

export default function TaskListItem(props) {
  const { handleClick, isActive, isSelected, taskName, taskTime  } = props;
  
  return(
    <div className={`list-item ${isActive ? 'active' : ''} ${isSelected ? 'selected' : ''}`} onClick={handleClick}>
      <div className="list-item-col1 list-item-col">
          <FontAwesome className="gear-icon" name='gear'></FontAwesome>  
      </div>
      <div className="list-item-col2 list-item-col">
        <h2>{taskName}</h2>
        <div>{taskTime}</div>
      </div>
      <div className="list-item-col3 list-item-col">
          <FontAwesome className="gear-icon" name='gear'></FontAwesome>  
          {props.children}
      </div>
    </div>
  );
}

TaskListItem.propTypes = {
  col1Text: PropTypes.string,
  col2Text: PropTypes.string
}