import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import randomColor from 'randomcolor'
import shortid from 'shortid';

import { secondsToHMMSS } from 'helpers/time';
import { closeModal, updateTask, toggleEditTaskForm } from '../actions/indexActions'; 

import ContextMenu from '../containers/ContextMenu';
import ListItem from './ListItem';
import ListItemColumn from './ListItemColumn';

export default function TimesheetListItem(props) {
  const { actionIconClass, children, isActive, isSelected, handleItemClick, handlePlayClick, time, title  } = props;
  const letterIconColor = randomColor({
    // luminosity: 'light',
    hue: 'purple'
  }); 
  
  return (
    <ListItem
      key={shortid.generate()}
      isActive={isActive}
      isSelected={isSelected}
      handleClick={handleItemClick}
    >
      <ListItemColumn colNumber="1">
        <div className="list-item-button" style={{ "backgroundColor": letterIconColor ,  "borderColor": letterIconColor }}>
           <span className="list-item-letter-icon"> {title[0].toUpperCase()}</span>
        </div>
        {/* <FontAwesome className="list-item-icon list-item-task-icon" name='check-circle'></FontAwesome>   */}
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
          <span className={`icon-${isActive ? 'stop' : actionIconClass}`}></span>
        </div>
        { children }  
      </ListItemColumn>
       <ListItemColumn colNumber="4">
      </ListItemColumn> 
    </ListItem>
  );
}