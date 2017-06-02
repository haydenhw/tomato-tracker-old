import React, { Component} from 'react';
import PropTypes from 'prop-types';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
     currentCount: 3,
     intervalId: null
   };
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.isTimerActive) {
      const intervalId = setInterval(this.timer.bind(this), 1000);
      
      this.setState({intervalId: intervalId});
    }
  }
  
  timer () {
    const { currentCount, intervalId } = this.state; 
    
    
    
    this.setState(function (state, props) {
      return {
        currentCount: state.currentCount - 1
      }
    });
    if (currentCount < 2) {
      console.log('timer finished!');
      clearInterval(intervalId)
    }
  }
  
  
  render() {
    const { handleStartButtonClick, isTimerActive, task } = this.props;
    const seconds = this.state.currentCount;
    
    return (
      <div className="timer">
        <div>{task}</div>
        <div>{seconds}</div>
        <button onClick={handleStartButtonClick}>{isTimerActive ? "Pause" : "Start"}</button>
      </div>
    );
  }
  
}