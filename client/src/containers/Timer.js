import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect} from 'react-redux';

import { decrementTimer, incrementTaskTime, toggleIsTimerActive } from '../actions/indexActions';

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
    const { 
      activeProjectId,
      activeTaskId,
      decrementTimer,
      incrementTaskTime,
      remainingTime,
      toggleIsTimerActive
    } = this.props;
    
    const { intervalId } = this.state; 
    console.log(activeProjectId, activeTaskId)
    
    incrementTaskTime(activeProjectId, activeTaskId);
    decrementTimer();
    
    if (remainingTime < 1) {
      clearInterval(intervalId);
      toggleIsTimerActive();
    }
  }
  
  render() {
    const { isTimerActive, remainingTime, startTime, task, toggleIsTimerActive } = this.props;
    
    return (
      <div>
        <TimeDisplay startCount={startTime} time={remainingTime} title={task} />
        <button onClick={toggleIsTimerActive}>{isTimerActive ? "Pause" : "Start"}</button>
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
  toggleIsTimerActive
})(Timer);
