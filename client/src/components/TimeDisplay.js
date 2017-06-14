import React from 'react';
import PropTypes from 'prop-types';
import CircularProgressbar from 'react-circular-progressbar';
import FontAwesome from 'react-fontawesome';

import { secondsToMSS } from '../helpers/time'

import EditInlineText from '../containers/EditInlineText';

export default function TimeDisplay(props) {
  const { handleButtonClick, isTimerActive, setStartTime, startCount, title, time  } = props;
  const progressPercentage = Math.round((1-(time/startCount))*100);
  let displayTime = time || startCount; 
  
  return (
    <div className="timer">
      <div className="progress-bar-container"></div>
      {true && <CircularProgressbar
         initialAnimation={true} 
         percentage={progressPercentage} 
         strokeWidth={4} 
         textForPercentage={(pct)=>""}
       />}
      <div>{title}</div>
      <div className="timer-content">
        <EditInlineText className="edit-time" handleChange={setStartTime} text={secondsToMSS(displayTime)} />
        <div className="timer-control" onClick={handleButtonClick}>
          <FontAwesome className="fa-play" name="fa-play" />
        </div>
      </div>
    </div>
  );
}

TimeDisplay.propTypes = {
  title: PropTypes.string,
  time: PropTypes.number
}
