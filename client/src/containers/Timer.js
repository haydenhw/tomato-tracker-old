import React, { Component} from 'react';
import PropTypes from 'prop-types';

import TimeDisplay from '../components/TimeDisplay';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCount: props.startCount,
      intervalId: null
   };
  }
  
  componentWillReceiveProps(nextProps) {
    if (this.props.isTimerActive !== nextProps.isTimerActive && nextProps.isTimerActive) {
      const intervalId = setInterval(this.timer.bind(this), 1000);
      
      this.setState({ intervalId });
    }
    
    if (this.props.isTimerActive !== nextProps.isTimerActive && !nextProps.isTimerActive) {
        const { intervalId } = this.state;
        clearInterval(intervalId);
    }
  }
  
  timer () {
    const { currentCount, intervalId } = this.state; 
    const { incrementTaskTime, startCount, toggleIsTimerActive } = this.props;
    
    incrementTaskTime();
    
    this.setState(function (state){
      return {
        currentCount: state.currentCount - 1
      }
    });
    
    if (currentCount < 1) {
      clearInterval(intervalId);
      this.setState({ currentCount: startCount});
      toggleIsTimerActive();
    }
  }
  
  render() {
    const { toggleIsTimerActive, isTimerActive, task } = this.props;
    const seconds = this.state.currentCount;
    
    return (
      <div>
        <TimeDisplay time={seconds} title={task} />
        <button onClick={toggleIsTimerActive}>{isTimerActive ? "Pause" : "Start"}</button>
      </div>
    );
  }
  
}