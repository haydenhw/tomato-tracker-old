import React from 'react';
import PropTypes from 'prop-types';

export default function TimeDisplay(props) {
  const { title, time } = props;
  
  return (
    <div className="timer">
      <div>{title}</div>
      <div>{time}</div>
    </div>
  );
}

TimeDisplay.propTypes = {
  title: PropTypes.string,
  time: PropTypes.number.isRequired
}
