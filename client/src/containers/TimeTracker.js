import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { hashHistory } from 'react-router';
import shortid from 'shortid';

import { secondsToHMMSS } from 'helpers/time';

import ContextMenu from './ContextMenu';
import Modal from './Modal';
import List from '../components/List';
import Nag from '../components/Nag';
import TimesheetListItem from '../components/TimesheetListItem';
import Timesheet from '../components/Timesheet';
import TotalTime from '../components/TotalTime';
import Select from './Select';
import Timer from './Timer';

import {isDevOnboardingActive} from '../srcConfig/devSettings';

export default class TimeTracker extends Component {
  constructor(props) {
    super(props);

    const { tasks } = this.props;

    this.state = {
      activeTaskId: null,
      activeContextMenuParentId: null,
      clickedTaskId: null,
      selectedTaskId: null,
      tasks: tasks,
    }
  }

  static defaultProps = {
    tasks: []
  }

  componentWillMount() {
    const { projects, selectedProject, setSelectedProject } = this.props;

    if (
      localStorage.selectedProjectId &&
      projects.find(project => project.shortId === localStorage.selectedProjectId)
    ) {
      setSelectedProject(localStorage.selectedProjectId);
    } else {
    }

    const isPrevSelectedTaskParentActive = Boolean(selectedProject.tasks.find(task => task.shortId === localStorage.prevSelectedTaskId));

    if (isPrevSelectedTaskParentActive) {
      this.setState({ selectedTaskId: localStorage.prevSelectedTaskId });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isTimerActive, tasks } = this.props;

    if ((prevProps.tasks.length !== tasks.length) && (tasks.length === 0)) {
      localStorage.setItem('prevSelectedTaskId', null);
      this.setState({ selectedTaskId: null });
    }

    if (prevProps.tasks.length + 1 === tasks.length) {
      const newTaskId = tasks[0].shortId;

      this.handleTaskChange(newTaskId, () => {
        if (isTimerActive) {
         this.setActiveTask(newTaskId);
        }
     });
    }
  }

  componentWillReceiveProps(nextProps) {
      /*  if(nextProps.tasks !== this.props.tasks) {
      this.setState({
      tasks: nextProps.tasks,
      activeTaskId: nextProps.tasks.length > 0 ? nextProps.tasks[0].id : null
    })
    }*/
  }

  handleAddTasks() {
    const { toggleAddTasksForm } = this.props;

    toggleAddTasksForm();
  }

  handleEditTask = (taskId) => () => {
    const { toggleEditTaskForm } = this.props;

    toggleEditTaskForm(taskId);
  }

  handleTaskChange(taskId, callback) {
    const { addEntry, isTimerActive } = this.props;

    if (localStorage.prevSelectedTaskId !== taskId) {
      localStorage.setItem("prevSelectedTaskId", taskId);

      if (isTimerActive) {
        addEntry(taskId);
      }
    }

    if (callback) {
      callback();
    }

    this.setState({ selectedTaskId: taskId });
  }

  handlePlayClick = (taskId) => () => {
    const { isTimerActive, toggleTimer } = this.props;
    const { selectedTaskId } = this.state;

    if (isTimerActive && (selectedTaskId === taskId)) {
      toggleTimer();
      return null;
    }

    if (isTimerActive && !(selectedTaskId === taskId)) {
      this.setState({ activeTaskId: taskId })
      this.handleTaskChange(taskId);
      return null;
    }

    this.setState({ activeTaskId: taskId }, toggleTimer)
    this.handleTaskChange(taskId);
  }

  handleTaskDelete = (selectedProject, task) => () => {
    const { deleteTask } = this.props;

    deleteTask(selectedProject, task, true);
  }

  handleTaskItemClick = (taskId) => () => {
    this.handleTaskChange(taskId);
  }

  setActiveTask(selectedTaskId) {
    this.setState({ activeTaskId: selectedTaskId });
  }

  setActiveContextMenu = (activeContextMenuParentId) => () => {
    this.setState({ activeContextMenuParentId });
  }

  renderTask (task){
    const { changeActiveContextMenu, isTimerActive, selectedProject, tasks, toggleTimer } = this.props;
    const { activeTaskId, selectedTaskId } = this.state;
    const { shortId, taskName, recordedTime } = task;

    return (
      <TimesheetListItem
        actionIconClass="play"
        key={shortid.generate()}
        // className="task"
        handleItemClick={this.handleTaskItemClick(shortId)}
        handlePlayClick={this.handlePlayClick(shortId)}
        isActive={(activeTaskId === shortId) && isTimerActive}
        isSelected={selectedTaskId === shortId}
        title={taskName}
        time={recordedTime}

      >
        <ContextMenu
          className='list-item-context-menu'
          onMenuClick={changeActiveContextMenu}
          parentId={shortId}
        >
          <li className="popup-menu-item" onClick={this.handleEditTask(shortId)}>
            <i className="context-menu-icon icon-edit"></i>
            <a>Edit</a>
          </li>
          <li className="popup-menu-item" onClick={this.handleTaskDelete(selectedProject, task)}>
            <i className="context-menu-icon icon-delete"></i>
            <a>Delete</a>
          </li>
        </ContextMenu>
      </TimesheetListItem>
    );
  }

  renderTaskSelect() {
    const { tasks } = this.props;
    const { selectedTaskId } = this.state;

    const simplifiedTasks = tasks.map(task => ({
      name: task.taskName,
      id: task.shortId
    }));

    const selectedTask = tasks.find(task => task.shortId === selectedTaskId) //|| tasks[0];
    const selectedTaskName = selectedTask && selectedTask.taskName;
    const taskSelectHeading = selectedTaskName || "Click to select a task...";
    const headingClass = selectedTaskName ? "" : "grey";

    return (
      <Select
        className={"task-select"}
        handleOptionClick={this.handleTaskChange.bind(this)}
        items={simplifiedTasks}
        >
          <span className={headingClass}>{taskSelectHeading}</span>
        </Select>
      );
    }

  render() {
    const { isModalClosing, isOnboardingActive, selectedProject, tasks, toggleConfig } = this.props;
    const { activeTaskId, selectedTaskId } = this.state;
    const totalTime = tasks.length ? tasks.map((task) => Number(task.recordedTime)).reduce((a,b) => a + b) : 0;
    const selectedProjectName = selectedProject ?  selectedProject.projectName : '';

    return (
      <div>
        <section className="timer-section">
          <div className="timer-settings-wrapper" onClick={toggleConfig}>
            <FontAwesome className="timer-settings-icon" name='gear'></FontAwesome>
          </div>
          <div className="timer-container">
            {tasks.length > 0 && this.renderTaskSelect()}
           <Timer
             activeTaskId={activeTaskId}
             tasks={tasks}
             selectedTaskId={selectedTaskId}
             setActiveTask={this.setActiveTask.bind(this)}
           />
          </div>
        </section>
        {tasks.length > 0
          ? <section className="timesheet-section">
             <Timesheet
                buttonText="NEW TASKS"
                handleButtonClick={this.handleAddTasks.bind(this)}
                titleText={["Tasks for project ", <span className={"grey-title-text"} key={shortid.generate()}>{selectedProject.projectName}</span>]}
                >
                  <List className="timesheet-list list" items={tasks} renderItem={this.renderTask.bind(this)} />
                  <TotalTime time={secondsToHMMSS(totalTime)} />
              </Timesheet>
            </section>
            : <Nag
                actionButtonText="ADD TASKS"
                nagMessage={<span>Add tasks to project <span className="grey-title-text">{selectedProjectName}</span> to start tracking time.</span>}
                onActionButtonClick={this.handleAddTasks.bind(this)}
              />
        }
        <Modal modalClass={`${isOnboardingActive ? 'fullscreen-modal' : 'normal-modal add-task-form-modal'}`}
         rootModalClass={`${ isOnboardingActive? 'unfold' : 'roadrunner'} ${ isModalClosing ? 'out' : ''}`}
        />
      </div>
    );
  }
}

TimeTracker.propTypes = {
  tasks: PropTypes.array
}
