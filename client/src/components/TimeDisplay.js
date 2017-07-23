import React from 'react';
import PropTypes from 'prop-types';
import CircularProgressbar from 'react-circular-progressbar';
import FontAwesome from 'react-fontawesome';

import { secondsToMSS } from '../helpers/time'
import { showProgressBar, devStyle } from '../config'

import EditInlineText from '../containers/EditInlineText';

export default function TimeDisplay(props) {
  const {
    activeTaskId, 
    handleButtonClick,
    isTimerActive,
    isTimerControlActive,
    toggleTimer,
    startCount,
    title,
    time
  } = props;
  
  const progressPercentage = Math.round((1-(time/startCount))*100);
  let displayTime = time || startCount; 
  
  const flippedClass = isTimerActive ? "flip-button flipped" : "flip-button";
  
  return (
    <div className="timer">
      <div className="progress-bar-container"></div>
      {showProgressBar && <CircularProgressbar
        initialAnimation={true} 
        percentage={progressPercentage} 
        strokeWidth={4} 
        textForPercentage={(pct)=> ""}
      />}
      <div>{title}</div>
      <div style={devStyle || null} className="timer-content">
        <EditInlineText className="edit-time" handleChange={toggleTimer} text={secondsToMSS(displayTime)} />
        <div className="timer-control">
          <div 
            className={`${isTimerControlActive ? "active": "" } flip-button-container`}  
            onClick={isTimerControlActive && handleButtonClick}
            >
            <div className={flippedClass}>
              <div className="side">
                <FontAwesome className="fa-play" name="fa-play" />
              </div>
              <div className="side back">
                <FontAwesome className="fa-stop" name="fa-stop" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TimeDisplay.propTypes = {
  title: PropTypes.string,
  time: PropTypes.number
}
