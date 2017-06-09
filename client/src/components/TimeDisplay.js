import React from 'react';
import PropTypes from 'prop-types';
import CircularProgressbar from 'react-circular-progressbar';

export default function TimeDisplay(props) {
  const { startCount, title, time  } = props;
  const percentage = Math.round((1-(time/startCount))*100);
  return (
    <div className="timer">
      <div className="progress-bar-container"></div>
      <CircularProgressbar percentage={percentage} textForPercentage={(pct)=>""}/>
      <div>{title}</div>
      <div>{time}</div>
    </div>
  );
}

TimeDisplay.propTypes = {
  title: PropTypes.string,
  time: PropTypes.number.isRequired
}
