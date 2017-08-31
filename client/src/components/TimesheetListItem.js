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
        <FontAwesome className="list-item-icon list-item-task-icon" name='check-circle'></FontAwesome>  
      </ListItemColumn>
      <ListItemColumn colNumber="2">
        <div>
          <h2 className="list-item-col-title">{title}</h2>
          <div className="list-item-col-time">{secondsToHMMSS(time)}</div>
        </div>
      </ListItemColumn>
      
      <ListItemColumn colNumber="3">
        {/* <div className="list-item-button">
          <span className="icon-dots-three-horizontal">
          </span>
        </div> */}

        {/* <FontAwesome className="list-item-icon list-item-play-icon" name='play-circle'></FontAwesome>   */}
        <div className="list-item-button" onClick={handlePlayClick}>
          <span className="list-item-button-child list-item-play">
            <span className="context-menu-icon icon-dots-three-horizontal"></span>
            {/* <FontAwesome className="list-item-icon list-item-play-icon" name={`${isActive ? 'stop' : 'play'}`}/>   */}
          </span> 
        </div>
      </ListItemColumn>
      
       <ListItemColumn colNumber="4">
        <a className="list-item-button" onClick={""}>
        {/* <a className="" onClick={""}> */}
          <span className="list-item-button-child list-item-menu">
            { children }
          </span> 
        </a> 
      </ListItemColumn> 
    </ListItem>
  );
}