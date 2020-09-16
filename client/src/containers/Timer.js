import React, { Component} from 'react';
import { connect} from 'react-redux';

import {
  setRemainingTime,
  incrementTaskTime,
  setStartTime,
  toggleTimer,
  startTimer,
  stopTimer,
} from '../actions/indexActions';

import TimeDisplay from '../components/TimeDisplay';

class Timer extends Component {
  // TODO delete componentWillReceiveProps
  componentWillReceiveProps(nextProps) {
    const {  selectedTaskId, setActiveTask, } = this.props;

    if ((this.props.isTimerActive !== nextProps.isTimerActive) && nextProps.isTimerActive) {
      // while task change when isTimerActive is disabled
      // setActiveTask(selectedTaskId);
    }
  }

  handleSetStartTime = () => (newTime) => {
    const { selectedTaskId, setStartTime, selectedProject } = this.props;
    const shouldToggleTimer = Boolean(selectedTaskId);
    const activeTask = selectedProject.tasks.find(task => task.shortId === selectedTaskId);

    setStartTime(newTime, selectedProject, activeTask, shouldToggleTimer);
  };

  localStorage = this.props;

  toggleTimer = () => {
    const { isTimerActive, startTimer, stopTimer, startTime,  selectedProject, selectedTaskId  } = this.props;
    const activeTask = selectedProject.tasks.find(task => task.shortId === selectedTaskId);
    if (isTimerActive) {
      stopTimer();
    } else {
      startTimer(startTime, selectedProject, activeTask);
    }
  };

  render() {
    const {
      isTimerActive,
      remainingTime,
      startTime,
      selectedTaskId,
      task,
    } = this.props;

    return (
      <div>
        <TimeDisplay
          isTimerActive={isTimerActive}
          isTimerControlActive={true}
          setStartTime={this.handleSetStartTime(selectedTaskId)}
          startCount={startTime}
          time={remainingTime}
          title={task}
          handleButtonClick={this.toggleTimer}
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
    intervalId,
    isTimerActive,
    remainingTime,
    selectedProject,
    startTime,
    projects: projects.items
  }
};

export default connect(mapStateToProps, {
  setRemainingTime,
  incrementTaskTime,
  setStartTime,
  startTimer,
  stopTimer,
  toggleTimer
})(Timer);
