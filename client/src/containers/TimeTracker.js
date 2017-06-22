import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import Isvg from 'react-inlinesvg';
import shortid from 'shortid';

import { secondsToHMMSS } from 'helpers/time';

import FormModal from './FormModal';
import List from '../components/List';
import ListHeader from '../components/ListHeader';
import ProjectHeading from '../components/ProjectHeading';
import ListItem from '../components/ListItem';
import RoundButton from '../components/RoundButton';
import TotalTime from '../components/TotalTime';
import Select from './Select';
import Timer from './Timer';

export default class TimeTracker extends Component {
  constructor(props) {
    super(props);
    
    const { tasks } = this.props;
    
    this.state = {
      activeTaskId: null,
      tasks: tasks,
    }
  }
  
  static defaultProps = {
    tasks: []
  }
  
  componentDidMount() {
    console.log()
    if (!localStorage.getItem('isFirstUserVisit')) {
      localStorage.setItem('isFirstUserVisit', 'true');
    } else {
      localStorage.removeItem('isFirstUserVisit');
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

  handleTaskChange(taskId){
    this.setState({ activeTaskId: taskId });
  }

  renderTask (task){
    const { activeProject, deleteTask, isTimerActive } = this.props;
    const { activeTaskId } = this.state;
    const { taskName, recordedTime } = task;
    
    const handleTaskDelete = () => deleteTask(activeProject, task, true);
    
    return (
      <ListItem
        className="task"
        key={shortid.generate()}
        col1Text={taskName}
        col2Text={secondsToHMMSS(recordedTime)} 
        isActive={(activeTaskId === task.shortId) && isTimerActive}
      >
        <li className="dropdown-item"><a>Edit</a></li>
        <li className="dropdown-item" onClick={handleTaskDelete}><a>Delete</a></li>
      </ListItem>
    ); 
  } 
  
  renderTaskSelect() {
    const { tasks } = this.props;
    const { activeTaskId } = this.state; 
    
    const simplifiedTasks = tasks.map(task => ({
      name: task.taskName,
      id: task.shortId
    }));
    
    const selectedTask = tasks.find(task => task.shortId === activeTaskId);
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
      const { projects, activeProject, setActiveProject } = this.props;
      
      const simplifiedProjects = projects.map(project => ({
        name: project.projectName,
        id: project.shortId
      }));
      
      return (
          <div className="project-select-wrapper">
            <span>Showing tasks for project: </span>
            <Select 
              className="project-select"
              handleOptionClick={setActiveProject}
              items={simplifiedProjects}
              >
                <ProjectHeading 
                  text={activeProject ? activeProject.projectName : "No projects added yet"}
                  iconClass={"icon icon-dots-menu"} 
                />
              </Select>
          </div>
        );
      }
      
      render() {
        const { tasks } = this.props;
        const { activeTaskId, isModalActive } = this.state;
        const totalTime = tasks.length ? tasks.map((task) => Number(task.recordedTime)).reduce((a,b) => a + b) : 0;
        
        return (
          <div className="time-tracker">
            <div className="timer-section">
              <div className="timer-container">
                {this.renderTaskSelect()}
                <Timer activeTaskId={activeTaskId} />
              </div>
            </div>
            <div className="timer-task-list list-container">
              {this.renderProjectSelect()}
              <List className="task-list" items={tasks} renderItem={this.renderTask.bind(this)}>
                <ListHeader col1Title="Task" col2Title="Time Logged" />
              </List>
              <TotalTime time={secondsToHMMSS(totalTime)} />
            </div>
            
            <RoundButton 
              icon={''}
              clickHandler={this.handleAddTasks.bind(this)} 
            />
              
            <FormModal
              form="ADD_PROJECT"
              handleCloseButtonClick={this.toggleShouldRenderModal.bind(this)}
              isActive={isModalActive}
            /> 
          </div>
        );
      }
    }
    
    TimeTracker.propTypes = {
      tasks: PropTypes.array
    }