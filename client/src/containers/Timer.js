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
      activeProject,
      activeTaskId,
      decrementTimer,
      projects,
      incrementTaskTime,
      remainingTime,
      resetTimer,
      toggleIsTimerActive
    } = this.props;
    
    const { intervalId } = this.state; 
    
    const activeTask = activeProject.tasks.find(task => task.shortId === activeTaskId);
    
    incrementTaskTime(activeProject, activeTask);
    decrementTimer();
    
    if (remainingTime < 1) {
      clearInterval(intervalId);
      toggleIsTimerActive();
      resetTimer();
    }
  }
  
  render() {
    const { activeTaskId, isTimerActive, remainingTime, setStartTime, startTime, startTimer, task } = this.props;
    
    return (
      <div>
        <TimeDisplay
          isTimerActive={isTimerActive}
          isTimerControlActive={Boolean(activeTaskId)}
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
  const { activeProjectId, projects, timer } = state;
  const { isTimerActive, remainingTime, startTime } = timer;
  const activeProject = projects.items.find(project => project.shortId === activeProjectId);
  
  return {
    activeProject,
    isTimerActive,
    remainingTime,
    startTime,
    projects: projects.items
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
