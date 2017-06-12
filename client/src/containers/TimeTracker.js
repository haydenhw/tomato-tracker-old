import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import FormModal from '../components/FormModal';
import List from '../components/List';
import ProjectHeading from '../components/ProjectHeading';
import Task from '../components/Task';
import Select from './Select';
import Timer from './Timer';

export default class TimeTracker extends Component {
  constructor(props) {
    super(props);
    
    const { tasks } = this.props;
    
     this.state = {
      isTimerActive: false,
      shouldRenderModal: true,
      selectedTaskId: null,
      timerStartCount: 10,
      tasks: tasks,
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.tasks !== this.props.tasks) {
      this.setState({
        tasks: nextProps.tasks,
        selectedTaskId: nextProps.tasks.length > 0 ? nextProps.tasks[0].id : null
      })
    }
  }
  
  incrementTaskTime() {
    const { tasks } = this.props;
    const { selectedTaskId } = this.state;
      const updatedTasks = tasks.map(task => {
        if (selectedTaskId === task.id) {
          const oldProps = task;
          const updatedProp = { recordedTime: task.recordedTime + 1 };
          
          return Object.assign({}, oldProps, updatedProp);
        }
        
        return task;
      })
      // console.log(updatedTasks[0])
      this.setState({ tasks: updatedTasks });
  }
  
  toggleIsTimerActive() {
    const { isTimerActive } = this.state;
    this.setState({isTimerActive: !isTimerActive})
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
    this.setState({ selectedTaskId: taskId });
  }
  
  renderTask (task){
    return <Task className="task" key={shortid.generate()} taskData={task} />
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
    const { projects, selectedProject, setSelectedProject } = this.props;
    
    const simplifiedProjects = projects.map(project => ({
      name: project.projectName,
      id: project.shortId
    }));
    
    return (
      <Select 
        className={"project-select"} 
        handleOptionClick={setSelectedProject}
        items={simplifiedProjects}
      >
        <ProjectHeading text={selectedProject.projectName} icon={"images/dots-menu.svg"} />
      </Select>
    );
  }
 
  render() {
    const { tasks } = this.props;
    
    const { 
      isTimerActive,
      shouldRenderModal,
      timerStartCount,
    } = this.state;
    
    return (
      <div className="countdown-timer">
        {this.renderTaskSelect()}
        <Timer 
          incrementTaskTime={this.incrementTaskTime.bind(this)}
          isTimerActive={isTimerActive} 
          toggleIsTimerActive={this.toggleIsTimerActive.bind(this)} 
          startCount={timerStartCount}
        />
        <div className="timer-task-list">
          {this.renderProjectSelect()}
          <List className="task-list" items={tasks} renderItem={this.renderTask}/>
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