import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { updateProject } from '../actions/indexActions';

let EditProjectForm = class extends Component {
  render() {
    const { handleSubmit, project, updateProject } = this.props;
    const handleEditProjectSubmit = ({ projectName }) => {
      
      updateProject(project, projectName);
    }
    
    return (
      <form onSubmit={handleSubmit(handleEditProjectSubmit)}>
        <div>
          <label>Project Name</label>
          <div>
            <Field
              name="projectName"
              component="input"
              type="text"
              placeholder="Project Name"
            />
            <input type="submit"/>
          </div>
        </div>
      </form>
    );
  }
};

EditProjectForm = reduxForm({
  form: 'initializeFromState', // a unique identifier for this form
})(EditProjectForm);

EditProjectForm = connect(
  state => {
    const { activeProjectId, projects } = state;
    
    const activeProject = projects.find((project) => project.shortId === activeProjectId); 
     
    const projectName = state.projects.length && activeProjectId 
    ? activeProject.name
    : 'No Projects Loaded'
    
    return ({
      activeProjectId, 
      initialValues: { projectName: 'default' }, 
      project: activeProject
    })
  }, { updateProject})(EditProjectForm);

export default EditProjectForm;
