import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { hashHistory } from 'react-router';
import shortid from 'shortid';

import { secondsToHMMSS } from 'helpers/time';

import EditMenu from './EditMenu';
import Modal from './Modal';
import List from '../components/List';
import ListHeader from '../components/ListHeader';
import ProjectHeading from '../components/ProjectHeading';
import ListItem from '../components/ListItem';
import TotalTime from '../components/TotalTime';
import Select from './Select';
import Timer from './Timer';

export default class TimeTracker extends Component {
  constructor(props) {
    super(props);
    
    const { tasks } = this.props;
    
    this.state = {
      activeTaskId: null,
      activeEditMenuParentId: null, 
      clickedTaskId: null,
      selectedTaskId: null, 
      tasks: tasks,
    }
  }

  static defaultProps = {
    tasks: []
  }
  
  componentWillMount() {
    const { isModalActive, projects, tasks } = this.props;
    // change isModalActive to isOnboardingActive for production  
     
    if ((projects.length === 0) && !isModalActive) {
      hashHistory.push('/projects')
    }
      
    const selectedTaskId = tasks.find((task) => task.shortId === localStorage.prevSelectedTaskId)
      ? localStorage.prevSelectedTaskId
      : null
      
    this.setState({ selectedTaskId });
    
    this.handleFirstSessionVisit();  
  }
  
  
  componentDidUpdate(prevProps, prevState) {
    const { tasks } = this.props;
    
    if ((prevProps.tasks.length !== tasks.length) && (tasks.length === 0)) {
      localStorage.setItem('prevSelectedTaskId', null);
      this.setState({ selectedTaskId: null });
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
  
  handleFirstSessionVisit() {
    const { toggleOnboardMode } = this.props;
    
    sessionStorage.isFirstSessionVisit = !Boolean(sessionStorage.isFirstSessionVisit);
    
    if (JSON.parse(sessionStorage.isFirstSessionVisit) === true) {
      toggleOnboardMode();  
    }  
  }

  toggleShouldRenderModal(modalType) {
    const { shouldRenderModal } = this.state;

    let newModalState = { shouldRenderModal: !shouldRenderModal};

    if (modalType) { 
      const updatedModalType = { modalType: modalType};
      newModalState = Object.assign(newModalState, updatedModalType);
    }

    this.setState(newModalState);
  }
  
  handleAddTasks() {
    const { toggleAddTasksForm } = this.props;
    
    toggleAddTasksForm();
  }
  
  handleEditTask = (taskId) => () => {
    const { toggleEditTaskForm } = this.props;
    
    toggleEditTaskForm(taskId);
    // this.setState({ clickedTaskId: taskId});
  } 

  handleTaskChange(taskId){
    const { isTimerActive } = this.props;
    
    if (isTimerActive) {
      return null;
    }
    
    if (localStorage.prevSelectedTaskId !== taskId) {
      localStorage.setItem("prevSelectedTaskId", taskId);
    }
      
    this.setState({ selectedTaskId: taskId });
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
  
  setActiveEditMenu = (activeEditMenuParentId) => () => {
    this.setState({ activeEditMenuParentId });  
  }
  
  renderTask (task){
    const { changeActiveEditMenu, selectedProject, isTimerActive } = this.props;
    const { activeTaskId, selectedTaskId } = this.state;
    const { shortId, taskName, recordedTime } = task;
    
    return (
      <ListItem
        key={shortid.generate()}
        className="task"
        col1Text={taskName}
        col2Text={secondsToHMMSS(recordedTime)} 
        handleClick={this.handleTaskItemClick(shortId)}
        isActive={(activeTaskId === shortId) && isTimerActive}
        isSelected={selectedTaskId === shortId}
      >
        <EditMenu
            className='list-item-edit-menu'
            onMenuClick={changeActiveEditMenu}
            parentId={shortId}
          >
          <li className="dropdown-item" onClick={this.handleEditTask(shortId)}><a>Edit</a></li>
          <li className="dropdown-item" onClick={this.handleTaskDelete(selectedProject, task)}><a>Delete</a></li>
        </EditMenu>  
      </ListItem>
    ); 
  } 

  renderTaskSelect() {
    const { tasks } = this.props;
    const { selectedTaskId } = this.state; 
    
    const simplifiedTasks = tasks.map(task => ({
      name: task.taskName,
      id: task.shortId
    }));
    
    const selectedTask = tasks.find(task => task.shortId === selectedTaskId);
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
  
  renderProjectSelect() {
    const { projects, selectedProject, setSelectedProject } = this.props;
    
    const simplifiedProjects = projects.map(project => ({
      name: project.projectName,
      id: project.shortId
    }));
    
    return (
      <div className="project-select-wrapper">
        <span>Timesheet for project <span>{selectedProject.projectName}</span></span>
        <ProjectHeading 
          text={selectedProject ? selectedProject.projectName : "No projects added yet"}
          iconClass={"icon icon-dots-menu"} 
        />
      </div>
    );
  }
  
  render() {
    const { tasks, selectedProject, toggleConfig } = this.props;
    const { activeTaskId, isModalActive, selectedTaskId } = this.state;
    const totalTime = tasks.length ? tasks.map((task) => Number(task.recordedTime)).reduce((a,b) => a + b) : 0;
  console.log(toggleConfig)  
    return (
      <div className="time-tracker">
        <div className="timer-section">
          <div className="gear-icon-wrapper" onClick={toggleConfig}>
            <FontAwesome className="gear-icon" name='gear'></FontAwesome>  
          </div>  
          <div className="timer-container">
            {tasks.length > 0 && this.renderTaskSelect()}
            <Timer activeTaskId={activeTaskId} selectedTaskId={selectedTaskId} setActiveTask={this.setActiveTask.bind(this)}/>
          </div>
        </div>
        {tasks.length > 0
          ? <div>
              <div className="timesheet list-container">
                <h2 className="timesheet-title">Timesheet for project <span className={"grey-title-name"}>{selectedProject.projectName}</span></h2>
                <div className="add-button-wrapper">
                  <button className="add-button material-button" onClick={this.handleAddTasks.bind(this)}>ADD TASK</button> 
                </div>
                <List className="task-list" items={tasks} renderItem={this.renderTask.bind(this)}>
                  <ListHeader col1Title="Task" col2Title="Time Logged" /> </List>
                <TotalTime time={secondsToHMMSS(totalTime)} />
              </div>
            </div>  
          : <div className="list-container">
              <span>Add tasks to your project to start tracking time.</span>
              <button className="add-button material-button" onClick={this.handleAddTasks.bind(this)}>ADD TASKS</button>
            </div>
          }
          <Modal modalClass="fullscreen-modal" rootModalClass="unfold" />
        </div>
    );
  }
}

TimeTracker.propTypes = {
  tasks: PropTypes.array
}