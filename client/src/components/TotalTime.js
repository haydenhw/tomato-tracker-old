import React from 'react';
import PropTypes from 'prop-types';

export default function TotalTime(props){
  const { time } = props;
  
  return (
    <div className='total-time list-item'>
      <div className="list-item-col1 list-col total-time-total"><span>Total:</span></div>
      <div className="list-item-col2 list-col"><span>{time}</span></div>
      <div className="list-item-col3 list-col"></div>
    </div>
  )
}

TotalTime.propTypes = {
  time: PropTypes.string.isRequired
}