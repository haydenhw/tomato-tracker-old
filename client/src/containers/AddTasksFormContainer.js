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
    this.deleteButtonRefs = {};
    // this.getInputRef = this.getInputRef.bind(this);  
  }
  
  // getInputRef(el) { return this.inputRef= el } 
  
  componentDidMount() {
    const { setTempTasks, showTasksForSelectedProject, tasks } = this.props;
    
    if (showTasksForSelectedProject) {
      setTempTasks(tasks);
    }
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
  
  handleFormSubmit (){
    const { 
      isOnboardingActive,
      updateTasks, 
      selectedProject,
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
    
    updateTasks(selectedProject, tasks);
    isOnboardingActive ? toggleOnboardMode() : toggleModal(false); 
  }
  
  handleDeleteButtonClick = (taskId) => () => {
    const { toggleShouldDelete } = this.props;
    
    toggleShouldDelete(taskId);
  }  
  
  handleDeleteButtonMouseOver = (taskId) => () => {
    this.deleteButtonRefs[taskId].focus();
  }
  
  handleDeleteButtonMouseOut = (taskId) => () => {
    this.deleteButtonRefs[taskId].blur();
  }
  
  renderFormTask (task){
    const { shouldDelete, taskName, shortId } = task;
    
    return (
      <div className="task-form-list-item" key={shortid.generate()}>
        <div className="button-wrapper" >
          <button ref={el => this.deleteButtonRefs[shortId] = el}
            onClick={this.handleDeleteButtonClick(shortId)}
            onMouseOver={this.handleDeleteButtonMouseOver(shortId)}
            onMouseOut={this.handleDeleteButtonMouseOut(shortId)}
          >
            {shouldDelete ? 'restore' : 'X' /*&times;*/}
          </button>
        </div>
        <div className="name-wrapper">
          <span>{taskName}</span>
        </div>
      </div>
    );
  }
  
  render() {
    const { formTasks, handleSubmit, shouldDisableFocusOnMount, shouldRenderSubmitButton } = this.props;
    
    return (
      
      <RemoteSubmitForm
        onTargetUpdate={this.handleFormSubmit.bind(this)}
      >
        <AddTasksForm 
          handleFormSubmit={/*handleFormSubmit ? handleFormSubmit(formTasks) :*/ this.handleFormSubmit.bind(this)}
          handleSubmit={handleSubmit}
          handleTaskSubmit={this.handleAddTask.bind(this)}
          shouldDisableFocusOnMount={shouldDisableFocusOnMount}
          renderFormTask={this.renderFormTask.bind(this)}
          shouldRenderSubmitButton={shouldRenderSubmitButton}
          tasks={formTasks}
          form={'tasks form'}
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