import { logPropTypes } from '../test/propTypeGen.test';
import React, { Component} from 'react';
import { connect} from 'react-redux';
import moment from 'moment';

import { secondsToMSS, getTimeSinceThen } from '../helpers/time';

import {
  decrementTimer,
  handleTimerComplete,
  incrementTaskTime,
  resetTimer,
  setIntervalId,
  setStartTime,
  toggleTimer,
} from '../actions/indexActions';

import TimeDisplay from '../components/TimeDisplay';

const getTimeStamp = (task, project, time, duration)  => {
  const beginning = `Task:'${task}'  Project:'${project}' `;
  const end = !duration && isNaN(duration)
   ? `Start: ${time} `
   : `Stop: ${time}  Duration:${duration}`;

  return `${beginning} ${end}`;
}

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
    const { selectedProject, selectedTaskId, setActiveTask, setIntervalId } = this.props;

    if ((this.props.isTimerActive !== nextProps.isTimerActive) && nextProps.isTimerActive) {
      const intervalId = setInterval(this.timer.bind(this), 1000);

      if(process.env.NODE_ENV !== 'development') {
        console.log(getTimeStamp(
          selectedProject.tasks.find(task => task.shortId === selectedTaskId).taskName,
          selectedProject.projectName,
          moment().format('h:mma')
          )
        );
      }

      localStorage.setItem('lastStartTime', moment().format('h:mm:ssa'));

      setIntervalId(intervalId);
      setActiveTask(selectedTaskId);
    }

    if ((this.props.isTimerActive !== nextProps.isTimerActive) && !nextProps.isTimerActive) {
      const { intervalId } = this.props;
      const lastStartTime = localStorage.getItem('lastStartTime');
      const now = moment().format('hh:mm:ssa');
      const timeSinceLastStart = getTimeSinceThen(now, lastStartTime);

      if(process.env.NODE_ENV !== 'development') {
        console.log(getTimeStamp(
          selectedProject.tasks.find(task => task.shortId === selectedTaskId).taskName,
          selectedProject.projectName,
          moment().format('h:mma'),
          timeSinceLastStart,
          )
        );
      }

      clearInterval(intervalId);
    }
  }

  doesSelectedTaskExist() {
    const { selectedTaskId, tasks } = this.props;
    const taskIds = tasks.map(task => task.shortId);

    return taskIds.includes(selectedTaskId);
  }

  timer () {
    const {
      alarmSoundSrc,
      decrementTimer,
      handleTimerComplete,
      incrementTaskTime,
      remainingTime,
      selectedProject,
      selectedTaskId,
      setActiveTask,
    } = this.props;

    const { intervalId } = this.props;

    decrementTimer();
    if (selectedProject) {
      const activeTask = selectedProject.tasks.find(task => task.shortId === selectedTaskId);

      incrementTaskTime(selectedProject, activeTask);
    }

    document.title = `${secondsToMSS(remainingTime)} TT`;

    if (remainingTime < 1) {
      const audio = new Audio(alarmSoundSrc);
      audio.play();

      clearInterval(intervalId);
      handleTimerComplete(selectedTaskId);
      setActiveTask(null);
    }
  }

  handleSetStartTime = (selectedTaskId) => (newTime) => {
    const { selectedTaskId, setStartTime } = this.props;
    const shouldToggleTimer = Boolean(selectedTaskId);

    setStartTime(newTime, shouldToggleTimer);
  }

  toggleTimer = () => {
    const { selectedTaskId, toggleTimer } = this.props;
    toggleTimer(selectedTaskId);
  }

  render() {
    console.log(logPropTypes(this.props))
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
}

export default connect(mapStateToProps, {
  decrementTimer,
  handleTimerComplete,
  incrementTaskTime,
  resetTimer,
  setIntervalId,
  setStartTime,
  toggleTimer
})(Timer);
