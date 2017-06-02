import React, { Component} from 'react';
import PropTypes from 'prop-types';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startCount: props.startCount,
      currentCount: props.startCount,
      intervalId: null
   };
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.isTimerActive) {
      const intervalId = setInterval(this.timer.bind(this), 1000);
      
      this.setState({ intervalId });
    }
  }
  
  timer () {
    const { currentCount, intervalId, startCount } = this.state; 
    const { toggleIsTimerActive } = this.props;
    this.setState(function (state){
      return {
        currentCount: state.currentCount - 1
      }
    });
    
    if (currentCount < 1) {
      console.log('timer finished!');
      clearInterval(intervalId);
      this.setState({ currentCount: startCount});
      toggleIsTimerActive();
    }
  }
  
  
  render() {
    const { toggleIsTimerActive, isTimerActive, task } = this.props;
    const seconds = this.state.currentCount;
    
    return (
      <div className="timer">
        <div>{task}</div>
        <div>{seconds}</div>
        <button onClick={toggleIsTimerActive}>{isTimerActive ? "Pause" : "Start"}</button>
      </div>
    );
  }
  
}