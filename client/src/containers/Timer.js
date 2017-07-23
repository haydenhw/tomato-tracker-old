import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect} from 'react-redux';

import store from '../redux-files/store';

import {
  decrementTimer,
  incrementTaskTime,
  resetTimer,
  setIntervalId,
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
    // console.log(isTimerActive)
      
    if (isTimerActive === false) {
        // console.log(intervalId)
      clearInterval(intervalId)
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if ((this.props.isTimerActive !== nextProps.isTimerActive) && nextProps.isTimerActive) {
      const { selectedTaskId, setActiveTask, setIntervalId } = this.props;
      const intervalId = setInterval(this.timer.bind(this), 1000);
      
      setIntervalId(intervalId);
      // this.setState({ intervalId });
      // store.dispatch({
      //   type: "SET_INTERVAL_ID",
      //   intervalId
      // })
      
      setActiveTask(selectedTaskId);
    }
    
    if ((this.props.isTimerActive !== nextProps.isTimerActive) && !nextProps.isTimerActive) {
      const { intervalId } = this.props;
      console.log('receive clearing')
      console.log(intervalId);
      clearInterval(intervalId);
    }
  }
  
  timer () {
    const { 
      selectedProject,
      decrementTimer,
      incrementTaskTime,
      remainingTime,
      resetTimer,
      selectedTaskId, 
      setActiveTask,
      toggleTimer
    } = this.props;
    
    const { intervalId } = this.props; 
    const activeTask = selectedProject.tasks.find(task => task.shortId === selectedTaskId);
    
    incrementTaskTime(selectedProject, activeTask);
    decrementTimer();
    
    if (remainingTime < 1) {
      clearInterval(intervalId);
      toggleTimer();
      resetTimer();
      setActiveTask(null);
    }
  }
  
  handleSetStartTime = (shouldStartTimer) => (startTime) => {
    const { toggleTimer } = this.props;
    
    toggleTimer(startTime, shouldStartTimer); 
  }
  
  render() {
    const {
      isTimerActive,
      remainingTime,
      startTime,
      toggleTimer,
      selectedTaskId,
      task,
    } = this.props;
    
    return (
      <div>
        <TimeDisplay
          isTimerActive={isTimerActive}
          isTimerControlActive={Boolean(selectedTaskId)}
          toggleTimer={this.handleSetStartTime(selectedTaskId !== null)} 
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
  const { selectedProjectId, projects, timer } = state;
  const { intervalId, isTimerActive, remainingTime, startTime } = timer;
  const selectedProject = projects.items.find(project => project.shortId === selectedProjectId);

  return {
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
  toggleTimer
})(Timer);
