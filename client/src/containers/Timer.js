import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect} from 'react-redux';

import store from '../redux-files/store';

import {
  decrementTimer,
  incrementTaskTime,
  resetTimer,
  setIntervalId,
  setStartTime,
  toggleTimer,
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
  
  componentWillMount() {
    const { intervalId, isTimerActive } = this.props;
      
    if (isTimerActive === false) {
      clearInterval(intervalId)
    }
  
  }
  
  componentWillReceiveProps(nextProps) {
    if ((this.props.isTimerActive !== nextProps.isTimerActive) && nextProps.isTimerActive) {
      const { selectedTaskId, setActiveTask, setIntervalId } = this.props;
      const intervalId = setInterval(this.timer.bind(this), 1000);
      
      setIntervalId(intervalId);
      
      setActiveTask(selectedTaskId);
    }
    
    if ((this.props.isTimerActive !== nextProps.isTimerActive) && !nextProps.isTimerActive) {
      const { intervalId } = this.props;
      
      clearInterval(intervalId);
    }
  }
  
  timer () {
    const { 
      alarmSoundSrc,
      decrementTimer,
      incrementTaskTime,
      remainingTime,
      resetTimer,
      selectedProject,
      selectedTaskId, 
      setActiveTask,
      toggleTimer
    } = this.props;
    
    const { intervalId } = this.props; 
    const activeTask = selectedProject.tasks.find(task => task.shortId === selectedTaskId);
    
    incrementTaskTime(selectedProject, activeTask);
    decrementTimer();
    
    if (remainingTime < 1) {
      const audio = new Audio(alarmSoundSrc);
      audio.play();
      
      clearInterval(intervalId);
      toggleTimer();
      resetTimer();
      setActiveTask(null);
    }
  }
  
  handleSetStartTime = (selectedTaskId) => (newTime) => {
    const { selectedTaskId, setStartTime } = this.props;
    const shouldToggleTimer = Boolean(selectedTaskId);
    
    setStartTime(newTime, shouldToggleTimer);  
  }
  
  render() {
    const {
      isTimerActive,
      remainingTime,
      startTime,
      toggleTimer,
      selectedTaskId,
      setStartTime,
      task,
    } = this.props;
    
    return (
      <div>
        <TimeDisplay
          isTimerActive={isTimerActive}
          isTimerControlActive={Boolean(selectedTaskId)}
          setStartTime={this.handleSetStartTime(selectedTaskId)}
          startCount={startTime}
          time={remainingTime}
          title={task}
          handleButtonClick={toggleTimer}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { config, selectedProjectId, projects, timer } = state;
  const { alarmSoundSrc } = config;
  const { intervalId, isTimerActive, remainingTime, startTime } = timer;
  const selectedProject = projects.items.find(project => project.shortId === selectedProjectId);

  return {
    alarmSoundSrc,
    selectedProject,
    intervalId,
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
  setIntervalId,
  setStartTime,
  toggleTimer
})(Timer);
