import React from 'react';
import PropTypes from 'prop-types';

export default function TotalTime(props){
  const { time } = props;
  
  return (
    <div className='total-time list-item'>
      <div className="list-item-col1 list-item-col total-time-total"><span>Total:</span></div>
      <div className="list-item-col2 list-item-col"><span>{time}</span></div>
      <div className="list-item-col3 list-item-col"></div>
    </div>
  )
}

TotalTime.propTypes = {
  time: PropTypes.string.isRequired
}