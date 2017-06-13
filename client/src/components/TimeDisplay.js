import React from 'react';
import PropTypes from 'prop-types';
import CircularProgressbar from 'react-circular-progressbar';

import { secondsToMSS } from '../helpers/time'

import EditInlineText from '../containers/EditInlineText';

export default function TimeDisplay(props) {
  const { startCount, title, time  } = props;
  const progressPercentage = Math.round((1-(time/startCount))*100);
  let displayTime = time || startCount; 
  
  return (
    <div className="timer">
      <div className="progress-bar-container"></div>
      {false && <CircularProgressbar percentage={progressPercentage} textForPercentage={(pct)=>""}/>}
      <div>{title}</div>
      <EditInlineText text={secondsToMSS(displayTime)} />
    </div>
  );
}

TimeDisplay.propTypes = {
  title: PropTypes.string,
  time: PropTypes.number
}
