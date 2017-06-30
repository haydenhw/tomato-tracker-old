import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { SubmissionError, reduxForm } from 'redux-form';

import { deleteTask, postTask, toggleModal, toggleOnboardMode, updateTasks } from '../actions/indexActions';
import { hasAnyValue, isDuplicate } from '../helpers/validate';

import AddTasksForm from '../components/AddTasksForm';

let AddTasksFormContainer = class extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      tasks: []
    }
  }
  
  componentDidMount() {
    const { tasks } = this.props;
    
    this.setState({ tasks });
  }
  
  toggleShouldDelete = (taskId) => (e) => {
    const { tasks } = this.state;
    const newTasks = tasks.map(task => {
      if (task.shortId === taskId) {
        const shouldDelete = !task.shouldDelete;
        return Object.assign({}, task, { shouldDelete })
      }
      
      return task;
    })
    
    this.setState({ tasks: newTasks })
  }
  
  handleAddTask({ taskName }) {
    const { tasks } = this.state
    
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
    
    this.setState({ tasks: [...tasks, newTask] })
    this.props.change('taskName', '')
  }
  
  
  handleFormSubmit (){
    const { 
      selectedProjectId,
      selectedProjectDatabaseId, 
      isOnboardingActive,
      postTask, 
      updateTasks, 
      toggleModal, 
      toggleOnboardMode 
    } = this.props;
    
    const { tasks } = this.state;
    
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
        .forEach((task) => deleteTask(selectedProjectDatabaseId, task));
        
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
    const { handleSubmit, handleFormSubmit, shouldSubmit, shouldRenderSubmitButton } = this.props;
    const { tasks } = this.state;
    
    return (
      <AddTasksForm 
        handleFormSubmit={handleFormSubmit ? handleFormSubmit(tasks) : this.handleFormSubmit.bind(this)}
        handleSubmit={handleSubmit}
        handleTaskSubmit={this.handleAddTask.bind(this)}
        renderFormTask={this.renderFormTask.bind(this)}
        shouldRenderSubmitButton={shouldRenderSubmitButton}
        shouldSubmit={shouldSubmit}
        test={'hello'}
        tasks={tasks}
      />
    );
  }
}  

const mapStateToProps = (state, ownProps) => {
  const { selectedProjectId, modal, projects } = state;
  const { isOnboardingActive } = modal;  
  
  const selectedProject = projects.items.find(project => project.shortId === selectedProjectId);
  const selectedProjectDatabaseId = selectedProject && selectedProject._id;
  
  const tasks = selectedProject && ownProps.showTasksForSelectedProject !== false
    ? selectedProject.tasks.map(task => Object.assign(task, { shouldDelete: false }))
    : [];
    
  return {
    selectedProjectId,
    selectedProjectDatabaseId,
    isOnboardingActive,
    tasks
  }
}
AddTasksFormContainer = reduxForm({
  form: 'addTasks',
})(AddTasksFormContainer);

export default AddTasksFormContainer = connect(mapStateToProps, {
  deleteTask,
  postTask,
  toggleModal,
  toggleOnboardMode,
  updateTasks
})(AddTasksFormContainer);

AddTasksFormContainer.propTypes = {
  handleSubmit: PropTypes.func,
  // tasks: PropTypes.array.isRequired,
}