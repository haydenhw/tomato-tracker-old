import React from 'react';
import PropTypes from 'prop-types';
import CircularProgressbar from 'react-circular-progressbar';

import EditInlineText from '../containers/EditInlineText';

export default function TimeDisplay(props) {
  const { startCount, title, time  } = props;
  const percentage = Math.round((1-(time/startCount))*100);
  
  
  return (
    <div className="timer">
      <div className="progress-bar-container"></div>
      {false && <CircularProgressbar percentage={percentage} textForPercentage={(pct)=>""}/>}
      <div>{title}</div>
      <EditInlineText text={time.toString()} />
    </div>
  );
}

TimeDisplay.propTypes = {
  title: PropTypes.string,
  time: PropTypes.number.isRequired
}
