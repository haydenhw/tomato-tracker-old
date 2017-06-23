import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { editTask } from '../actions/indexActions';

let EditTaskForm = class extends Component {
  render() {
    const { activeProjectId, clickedTaskId, editTask, handleSubmit } = this.props;
    
    const handleEditTaskSubmit = ({ taskName }) => {
      editTask(activeProjectId, clickedTaskId, { taskName });
    }
    
    return (
      <form onSubmit={handleSubmit(handleEditTaskSubmit)}>
        <div>
          <label>Task Name</label>
          <div>
            <Field
              name="taskName"
              component="input"
              type="text"
              placeholder="Task Name"
            />
            <input type="submit"/>
          </div>
        </div>
      </form>
    );
  }
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
EditTaskForm = reduxForm({
  form: 'EditTaskForm', // a unique identifier for this form
})(EditTaskForm);

// You have to connect() to any reducers that you wish to connect to yourself
EditTaskForm = connect(
  state => {
    const { activeProjectId, projects } = state;
    
    const projectName = state.projects.length && activeProjectId 
    ? projects.find((project) => project.shortId === activeProjectId).projectName
    : 'No Projects Loaded'
    
    return ({
      activeProjectId, 
      initialValues: { taskName: 'test' }, 
    })
  }, { editTask })(EditTaskForm);

export default EditTaskForm;
