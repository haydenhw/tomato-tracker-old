import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect} from 'react-redux';

import { decrementTimer, resetTimer } from '../actions/indexActions';

console.log(decrementTimer);

import TimeDisplay from '../components/TimeDisplay';

class Timer extends Component {
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
    const { decrementTimer, resetTimer } = this.props;
    
    incrementTaskTime();
      
      decrementTimer();
  /*  this.setState(function (state){
      return {
        currentCount: state.currentCount - 1
      }
    });*/
    
    if (currentCount < 1) {
      clearInterval(intervalId);
      resetTimer(); 
      toggleIsTimerActive();
    }
  }
  
  render() {
    const { isTimerActive, toggleIsTimerActive, remainingTime, startTime, task } = this.props;
    
    return (
      <div>
        <TimeDisplay startCount={startTime} time={remainingTime} title={task} />
        <button onClick={toggleIsTimerActive}>{isTimerActive ? "Pause" : "Start"}</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { timer } = state;
  const { remainingTime, startTime } = timer;
  
  return {
    remainingTime,
    startTime
  }
}

export default connect(mapStateToProps, {
  decrementTimer,
  resetTimer
})(Timer);
