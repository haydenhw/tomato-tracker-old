import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';
import { SubmissionError, reduxForm } from 'redux-form';

import { deleteTask, postTask, toggleIsFormModalActive, updateTasks } from '../actions/indexActions';
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
  
  handleAddTask({ taskName }) {
    const { tasks } = this.state;
    const taskNames = tasks.map(task => taskName);

    if(!hasAnyValue(taskName)) {
      return null;
    };;
    
    if (isDuplicate(taskName, )) {
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
  
  toggleShouldDelete = (taskId) => () => {
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
  
  handleFormSubmit (){
    const { activeProjectId, activeProjectDatabaseId, postTask, updateTasks, toggleIsFormModalActive } = this.props;
    const { tasks } = this.state;
    
    if (!tasks.length) {
      throw new SubmissionError({
        taskName: 'Please add at least one task',
      })
    }    
    
    const newTasks = tasks.filter((task) => !task.shouldDelete);
      updateTasks(activeProjectId, newTasks);
      
      newTasks.filter((task) => !task._id)
        .forEach((task) => postTask(activeProjectDatabaseId, task));
        
      tasks.filter((task) => task.shouldDelete && task._id)
        .forEach((task) => deleteTask(activeProjectDatabaseId, task));
        
      toggleIsFormModalActive(false);
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
    const { handleSubmit } = this.props;
    const { tasks } = this.state;
    
    return (
      <AddTasksForm 
        handleFormSubmit={this.handleFormSubmit.bind(this)}
        handleSubmit={handleSubmit}
        handleTaskSubmit={this.handleAddTask.bind(this)}
        renderFormTask={this.renderFormTask.bind(this)}
        tasks={tasks}
      />
    );
  }
}  

const validate = values => {
  if(values) {
    
  } else {
  }
}

const mapStateToProps = (state) => {
  const { projects } = state;
  
  const activeProjectId = projects[projects.length - 1].shortId;
  const activeProjectIndex = projects.findIndex(project => project.shortId === activeProjectId);
  const activeProject = projects[activeProjectIndex];
  const activeProjectDatabaseId = activeProject._id;
  
  const tasks = activeProject.tasks.map(task => Object.assign(task, { shouldDelete: false }));
  
  return {
    activeProjectId,
    activeProjectDatabaseId,
    tasks
  }
}
AddTasksFormContainer = reduxForm({
  form: 'addTasks',
  validate,
})(AddTasksFormContainer);

export default AddTasksFormContainer = connect(mapStateToProps, {
  deleteTask,
  postTask,
  toggleIsFormModalActive,
  updateTasks
})(AddTasksFormContainer);

AddTasksFormContainer.propTypes = {
  handleSubmit: PropTypes.func,
  // tasks: PropTypes.array.isRequired,
}