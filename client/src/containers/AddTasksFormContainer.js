import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { SubmissionError, reduxForm } from 'redux-form';
import store from '../redux-files/store';

import {
  addTempTask,
  deleteTask,
  postTask,
  setTempTasks,
  toggleModal,
  toggleOnboardMode,
  toggleShouldDelete,
  updateTasks
} from '../actions/indexActions';

import { hasAnyValue, isDuplicate } from '../helpers/validate';
import AddTasksForm from '../components/AddTasksForm';

let AddTasksFormContainer = class extends Component {
  constructor(props) {
    super(props);
    
    // this.getInputRef = this.getInputRef.bind(this);  
  }
  
  // getInputRef(el) { return this.inputRef= el } 
  
  componentDidMount() {
    const { setTempTasks, tasks } = this.props;
    
    setTempTasks(tasks);
  }
  
  toggleShouldDelete = (taskId) => () => {
    const { toggleShouldDelete } = this.props;
    
    toggleShouldDelete(taskId);
  }
  
  handleAddTask({ taskName }) {
    const { addTempTask, change, tempTasks: tasks } = this.props;
    const taskNames = tasks.map(task => task.taskName);
    
    if (!hasAnyValue(taskName)) {
      return null;
    }
    
    if (isDuplicate(taskName, taskNames)) {
      throw new SubmissionError({
        taskName: `A task with the name '${taskName}' already exists`,
      })
    }    
    
    const newTask = {
      taskName,
      key: shortid.generate(),
      recordedTime: 0,
      shortId: shortid.generate(),
      shouldDelete: false
    }
    
    addTempTask(newTask);
    change('taskName', '');
  }
  
  handleFormSubmit (){
    const { 
      deleteTask,
      selectedProject,
      selectedProjectId,
      selectedProjectDatabaseId, 
      isOnboardingActive,
      postTask, 
      updateTasks, 
      toggleModal, 
      toggleOnboardMode,
      tempTasks: tasks, 
    } = this.props;
    
    if (!tasks.length) {
      throw new SubmissionError({
        taskName: 'Please add at least one task'
      })
    }    
    
    const newTasks = tasks.filter((task) => !task.shouldDelete);
    updateTasks(selectedProjectId, newTasks);
      
    newTasks.filter((task) => !task._id)
      .forEach((task) => {
        selectedProjectDatabaseId 
          ? postTask(selectedProjectDatabaseId, task)
          : console.error('database id has not yet updated')
      });
        
    tasks.filter((task) => task.shouldDelete && task._id)
      .forEach((task) => deleteTask(selectedProject, task));
          
    isOnboardingActive ? toggleOnboardMode() : toggleModal(false); 
}
  
  renderFormTask (task){
    const { shouldDelete, taskName, shortId } = task;
    
    return (
      <div className="task-form-list-item" key={shortid.generate()}>
        <div className="button-wrapper">
          <button onClick={this.toggleShouldDelete(shortId)}>{shouldDelete ? 'restore' : 'X' /*&times;*/}</button>
        </div>
        <div className="name-wrapper">
          <span>{taskName}</span>
        </div>
      </div>
    );
  }
  
  render() {
    const { handleSubmit, handleFormSubmit, shouldSubmit, shouldRenderSubmitButton, tempTasks } = this.props;
    
    return (
      <AddTasksForm 
        handleFormSubmit={handleFormSubmit ? handleFormSubmit(tempTasks) : this.handleFormSubmit.bind(this)}
        handleSubmit={handleSubmit}
        handleTaskSubmit={this.handleAddTask.bind(this)}
        renderFormTask={this.renderFormTask.bind(this)}
        shouldRenderSubmitButton={shouldRenderSubmitButton}
        shouldSubmit={shouldSubmit}
        tasks={tempTasks}
      />
    );
  }
}  

const mapStateToProps = (state, ownProps) => {
  const { customForm, selectedProjectId, modal, projects } = state;
  const { isOnboardingActive } = modal;  
  const tempTasks = customForm.taskForm.tasks;
  
  const selectedProject = projects.items.find(project => project.shortId === selectedProjectId);
  const selectedProjectDatabaseId = selectedProject && selectedProject._id;

  const tasks = selectedProject && ownProps.showTasksForSelectedProject !== false
    ? selectedProject.tasks.map(task => Object.assign(task, { shouldDelete: false }))
    : [];
  return {
    selectedProject,
    selectedProjectId,
    selectedProjectDatabaseId,
    isOnboardingActive,
    tasks,
    tempTasks
  }
}

AddTasksFormContainer = reduxForm({
  form: 'addTasks',
})(AddTasksFormContainer);

export default AddTasksFormContainer = connect(mapStateToProps, {
  addTempTask, 
  deleteTask,
  focus,
  postTask,
  setTempTasks,
  toggleModal,
  toggleOnboardMode,
  toggleShouldDelete,
  updateTasks
})(AddTasksFormContainer);

AddTasksFormContainer.propTypes = {
  handleSubmit: PropTypes.func,
  // tasks: PropTypes.array.isRequired,
}