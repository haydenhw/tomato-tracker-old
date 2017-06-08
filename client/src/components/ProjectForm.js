import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, reduxForm } from 'redux-form';

import List from './List';

class ProjectForm extends Component {
  
  render() {
    const { 
      handleEditProjectSubmit,
      handleSubmit,
      handleEditTasksSubmit,
      project,
      renderFormTask
    } = this.props;
    const { projectName, tasks } = project;
    
    return (
      <div>
        <form id="project-form" className="project-form" onSubmit={handleSubmit(handleEditProjectSubmit.bind(this))}>
          <div>
            <label htmlFor="projectName">Project </label>
            <Field name="projectName" component={() => <input type="text" value={projectName}/>}/>
          </div>
        </form>
        
        <form onSubmit={handleSubmit(handleEditTasksSubmit.bind(this))}>
          <List className='form-task-list' items={tasks} renderItem={renderFormTask} />
          <label htmlFor="ad">Add Task</label>
          <Field name="add-task" component="input" type="text"/>
          <button  type="submit">Add Task</button>
        </form>
        <button form="project-form" type="submit">Submit</button>
      </div>
    );
  }
}

const validate = values => {
  if(values) {
    
  } else {
  }
}

// Decorate the form component
ProjectForm = reduxForm({
  form: 'project',
  validate, // a unique name for this form,
})(ProjectForm);

export default ProjectForm;

ProjectForm.propTypes = {
  // handleSubmit: PropTypes.func.isRequired,
  project: PropTypes.object
}