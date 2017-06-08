import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';

import List from './List';

class ProjectForm extends Component {
  render() {
    const { handleSubmit, handleTaskSubmit, project, renderFormTask } = this.props;
    const { projectName, tasks } = project;
    
    return (
      <div>
        <form className="project-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="projectName">Project </label>
            <Field name="projectName" component={() => <input type="text" value={projectName}/>}/>
          </div>
          <button type="submit">Submit</button>
        </form>
        
        <form onSubmit={handleTaskSubmit}>
          <List className='form-task-list' items={tasks} renderItem={renderFormTask} />
          <label htmlFor="ad">Add Task</label>
          <Field name="add-task" component="input" type="text"/>
          <button type="submit">Add Task</button>
        </form>
      </div>
    );
  }
}

// Decorate the form component
ProjectForm = reduxForm({
  form: 'project' // a unique name for this form
})(ProjectForm);

export default ProjectForm;

ProjectForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  project: PropTypes.object
}