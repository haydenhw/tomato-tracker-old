import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import { secondsToHMMSS } from 'helpers/time';

import FormModal from './FormModal';
import List from '../components/List';
import ListHeader from '../components/ListHeader';
import ProjectHeading from '../components/ProjectHeading';
import Task from '../components/Task';
import Select from './Select';
import Timer from './Timer';

export default class TimeTracker extends Component {
  constructor(props) {
    super(props);
    
    const { tasks } = this.props;
    
     this.state = {
      shouldRenderModal: false,
      activeTaskId: null,
      tasks: tasks,
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
  
  handleAddTaskSubmit(formValue) {
    const { tasks } = this.props;
    
    const newTask = {
      taskName: formValue.name,
      recordedTime: 0,
      id: shortid.generate()
    }
    
    const newTasks = [...tasks, newTask]
    console.log(newTasks)
    this.setState({tasks: newTasks});
    this.setState({shouldRenderModal: false});
  }
  
  handleTaskChange(taskId){
    console.log('changing active task')
    this.setState({ activeTaskId: taskId });
  }
  
  renderTask (task){
    return <Task className="task" key={shortid.generate()} taskData={task} />
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
    
    return (
      <Select 
        className={"task-select"} 
        handleOptionClick={this.handleTaskChange.bind(this)}
        items={simplifiedTasks}
        headingText={taskSelectHeading}
      >
        <span>{taskSelectHeading}</span>
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
      <Select 
        className={"project-select"} 
        handleOptionClick={setActiveProject}
        items={simplifiedProjects}
      >
        <ProjectHeading text={activeProject.projectName} icon={"images/dots-menu.svg"} />
      </Select>
    );
  }
 
  render() {
    const { tasks } = this.props;
    const {  activeTaskId, shouldRenderModal } = this.state;
    const totalTime = tasks.map((task) => task.recordedTime).reduce((a,b) => a + b);
    
    return (
      <div className="countdown-timer">
        {this.renderTaskSelect()}
        <Timer activeTaskId={activeTaskId} />
        <div className="timer-task-list">
          {this.renderProjectSelect()}
          <List className="task-list" items={tasks} renderItem={this.renderTask}>
            <ListHeader col1Title="Task" col2Title="Time Logged" />
          </List>
          <div>
            <span>Total</span>
            <span>{secondsToHMMSS(totalTime)}</span>
          </div>
        </div>
        <button onClick={this.toggleShouldRenderModal.bind(this)}>New Task</button>
        <FormModal
          form="ADD_PROJECT"
          handleCloseButtonClick={this.toggleShouldRenderModal.bind(this)}
          hanldeFormSubmit={this.handleAddTaskSubmit.bind(this)}
          shouldRenderModal={shouldRenderModal}
        /> 
      </div>
    );
  }
}

TimeTracker.propTypes = {
  tasks: PropTypes.array
}