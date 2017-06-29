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
    const { selectedProjectId, projects } = state;
    
    const selectedProject = projects.find((project) => project.shortId === selectedProjectId); 
     
    const projectName = state.projects.length && selectedProjectId 
    ? selectedProject.name
    : 'No Projects Loaded'
    
    return ({
      selectedProjectId, 
      initialValues: { projectName: 'default' }, 
      project: selectedProject
    })
  }, { updateProject})(EditProjectForm);

export default EditProjectForm;
