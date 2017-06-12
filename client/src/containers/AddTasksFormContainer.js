import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import shortid from 'shortid';

import { addTask } from '../actions/indexActions';

import AddTasksForm from '../components/AddTasksForm';

let AddTasksFormContainer = class extends Component {
  constructor(props) {
    super(props);
    
    this.state= {
      tasks: null
    }
  }
  
  renderFormTask (task){
    const { taskName } = task;
    
    return (
      <div className="task-form-list-item" key={shortid.generate()}>
        <div className="button-wrapper">
          <button onClick={() => console.log('deleting task')}>&times;</button>
        </div>
        <span>{taskName}</span>
      </div>
    );
  }
  
  render() {
    const {
      addTask,
      handleSubmit,
      tasks,
    } = this.props;
    
    return (
      <AddTasksForm 
        handleSubmit={handleSubmit}
        handleTaskSubmit={addTask}
        renderFormTask={this.renderFormTask}
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
  
  const activeProjectId = state.activeProjectId || projects[0].shortId;
  const activeProjectIndex = projects.findIndex(project => project.shortId === activeProjectId);
  const activeProject = projects[activeProjectIndex];
  const tasks = activeProject.tasks;
  
  return {
    tasks
  }
}
AddTasksFormContainer = reduxForm({
  form: 'addTasks',
  validate,
})(AddTasksFormContainer);

export default AddTasksFormContainer = connect(mapStateToProps, {
  addTask
})(AddTasksFormContainer);

AddTasksFormContainer.propTypes = {
  handleSubmit: PropTypes.func,
  // tasks: PropTypes.array.isRequired,
}