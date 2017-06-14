import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect} from 'react-redux';

import {
  decrementTimer,
  incrementTaskTime,
  resetTimer,
  setStartTime,
  startTimer,
  toggleIsTimerActive
} from '../actions/indexActions';

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
  
  componentDidMount() {
    const { resetTimer } = this.props;
    resetTimer(); 
  }
  
  timer () {
    const { 
      activeProjectId,
      activeTaskId,
      decrementTimer,
      incrementTaskTime,
      remainingTime,
      resetTimer,
      toggleIsTimerActive
    } = this.props;
    
    const { intervalId } = this.state; 
    
    incrementTaskTime(activeProjectId, activeTaskId);
    decrementTimer();
    
    if (remainingTime < 1) {
      clearInterval(intervalId);
      toggleIsTimerActive();
      resetTimer();
    }
  }
  
  render() {
    const { isTimerActive, remainingTime, setStartTime, startTime, startTimer, task } = this.props;
    
    return (
      <div>
        <TimeDisplay
          isTimerActive={isTimerActive}
          setStartTime={setStartTime} 
          startCount={startTime}
          time={remainingTime}
          title={task}
          handleButtonClick={startTimer}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { activeProjectId, timer } = state;
  const { isTimerActive, remainingTime, startTime } = timer;
  
  return {
    activeProjectId,
    isTimerActive,
    remainingTime,
    startTime
  }
}

export default connect(mapStateToProps, {
  decrementTimer,
  incrementTaskTime,
  resetTimer,
  setStartTime,
  startTimer,
  toggleIsTimerActive,
})(Timer);
