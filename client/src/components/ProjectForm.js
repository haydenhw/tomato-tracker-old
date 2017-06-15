import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import List from './List';

let ProjectForm = class extends Component {
  render() {
    const { 
      handleEditProjectSubmit,
      handleSubmit,
      handleAddTaskSubmit,
      project,
      renderFormTask
    } = this.props;
    
    
    const { tasks } = project;
    console.log(this.props);
    return (
      <div>
        <form id="project-form" className="project-form" onSubmit={handleSubmit(handleEditProjectSubmit.bind(this))}>
          <div>
            <label htmlFor="projectName">Project </label>
            <Field name="projectName" component="input"/>
          </div>
        </form>
        
        {/* <List className='form-task-list' items={tasks} renderItem={renderFormTask} />
        
        <form onSubmit={handleSubmit(handleAddTaskSubmit.bind(this))}>
          <label htmlFor="ad">Add Task</label>
          <Field name="taskName" component="input" type="text"/>
          <button  type="submit">Add Task</button>
        </form>
        <button form="project-form" type="submit">Submit</button> */}
      </div>
    );
  }
}

const validate = values => {
  if(values) {
    
  } else {
  }
}
 
ProjectForm = reduxForm({
  form: 'ProjectForm',
  validate,
})(ProjectForm);

const mapStateToProps = state => {
  const { activeProjectId, projects } = state;
  const activeProjectName = 
    activeProjectId 
    ? projects.find(project => activeProjectId === project.shortId).projectName
    : null
    
  return {
    inititalValues: {
      projectName: state.projects[0].projectName
      
    }
  }
}

ProjectForm = connect(mapStateToProps)(ProjectForm)

export default ProjectForm;

ProjectForm.propTypes = {
  // handleSubmit: PropTypes.func.isRequired,
  handleEditProjectSubmit: PropTypes.func.isRequired,
  handleAddTaskSubmit: PropTypes.func.isRequired,
  renderFormTask: PropTypes.func.isRequired,
  project: PropTypes.object
}