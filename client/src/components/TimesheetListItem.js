import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import shortid from 'shortid';

import { secondsToHMMSS } from 'helpers/time';
import { closeModal, updateTask, toggleEditTaskForm } from '../actions/indexActions'; 

import ContextMenu from '../containers/ContextMenu';
import ListItem from './ListItem';
import ListItemColumn from './ListItemColumn';

export default function TimesheetListItem(props) {
  const { children, isActive, isSelected, handleItemClick, handlePlayClick, time, title  } = props;
  
  return (
    <ListItem
      key={shortid.generate()}
      // className="className"
      isActive={isActive}
      isSelected={isSelected}
      handleClick={handleItemClick}
    >
      <ListItemColumn colNumber="1">
        {/* <div className="list-item-button">
          <span className="">A</span>
        </div> */}
        <FontAwesome className="list-item-icon list-item-task-icon" name='check-circle'></FontAwesome>  
      </ListItemColumn>
      <ListItemColumn colNumber="2">
        <div>
          <h2 className="list-item-col-title">{title}</h2>
          <div className="list-item-col-time">{secondsToHMMSS(time)}</div>
        </div>
      </ListItemColumn>
      
      <ListItemColumn colNumber="3">
        <div 
          className={`list-item-button list-item-${isActive ? 'stop' : 'play'} 
          ${isActive ? 'active' : ''}`}
          onClick={handlePlayClick}
        >
          <span className={`icon-${isActive ? 'stop' : 'play'}`}></span>
        </div>
        { children }
      </ListItemColumn>
      
       <ListItemColumn colNumber="4">
      </ListItemColumn> 
    </ListItem>
  );
}