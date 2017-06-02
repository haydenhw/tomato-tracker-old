import React from 'react';
import PropTypes from 'prop-types';

export default function Timer(props){
  const { seconds, task } = props;
  
  return (
    <div className="timer">
      <div>{task}</div>
      <div>{seconds}</div>
      <button>Start</button>
    </div>
  );
}