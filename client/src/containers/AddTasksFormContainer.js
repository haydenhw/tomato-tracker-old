import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { SubmissionError, reduxForm } from 'redux-form';

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
import RemoteSubmitForm from './RemoteSubmitForm';

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
  
  handleAddTask({ taskName }) {
    const { addTempTask, formTasks: tasks, reset } = this.props;
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
    reset('taskName');
  }
  
  deleteUnwantedTasks(tasks) {
    // delete tasks that do not already exist in the database
    // we assume that taks without the database created id '_id' do not yet exist in the database  
      
    const { selectedProject } = this.props;
    
    tasks.filter((task) => task.shouldDelete && task._id)
      .forEach((task) => deleteTask(selectedProject, task));
  }
  
  postUnsavedTasks(tasks) {
    // post tasks that do not already exist in the database
    // we assume that taks without the database created id '_id' do not yet exist in the database  
    
    const { selectedProjectDatabaseId, postTask } = this.props;  
    
    tasks.filter((task) => !task._id)
      .forEach((task) => {
        selectedProjectDatabaseId 
          ? postTask(selectedProjectDatabaseId, task)
          : console.error('database id has not yet updated')
      });  
      
  }
  
  handleFormSubmit (){
    const { 
      selectedProjectId,
      isOnboardingActive,
      updateTasks, 
      toggleModal, 
      toggleOnboardMode,
      formTasks: tasks, 
    } = this.props;
    
    const tasksToSubmit = tasks.filter((task) => !task.shouldDelete);
    
    if (!tasksToSubmit.length) {
      throw new SubmissionError({
        taskName: 'Please add at least one task'
      })
    }
    
    this.postUnsavedTasks(tasksToSubmit);    
    this.deleteUnwantedTasks(tasks);      
    
    // update appropriate tasks in state 
    updateTasks(selectedProjectId, tasksToSubmit);
    
    isOnboardingActive ? toggleOnboardMode() : toggleModal(false); 
  }
  
  toggleShouldDelete = (taskId) => () => {
    const { toggleShouldDelete } = this.props;
    
    toggleShouldDelete(taskId);
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
    const { handleSubmit, handleFormSubmit, shouldSubmit, shouldRenderSubmitButton, formTasks } = this.props;
    
    return (
      
      <RemoteSubmitForm
        onTargetUpdate={this.handleFormSubmit.bind(this)}
      >
        <AddTasksForm 
          handleFormSubmit={/*handleFormSubmit ? handleFormSubmit(formTasks) :*/ this.handleFormSubmit.bind(this)}
          handleSubmit={handleSubmit}
          handleTaskSubmit={this.handleAddTask.bind(this)}
          renderFormTask={this.renderFormTask.bind(this)}
          shouldRenderSubmitButton={shouldRenderSubmitButton}
          tasks={formTasks}
        />
      </RemoteSubmitForm>
    );
  }
}  

const mapStateToProps = (state, ownProps) => {
  const { customForm, selectedProjectId, modal, projects } = state;
  const { isOnboardingActive } = modal;  
  const formTasks = customForm.taskForm.tasks;
  
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
    formTasks
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