import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { hashHistory } from 'react-router';

import { updateProject } from '../actions/indexActions';

let EditProjectForm = class extends Component {
  componentWillMount() {
    const { selectedProject } = this.props;
    
    if (!selectedProject) {
    //  hashHistory.push('/projects'); 
    }
  }
    
  componentDidUpdate(prevProps) {
    if (prevProps.shouldSubmit !== this.props.shouldSubmit) {
      const { handleSubmit, project, updateProject } = this.props;
      handleSubmit(this.handleEditProjectSubmit(project, updateProject))();
    }
  }  
  
  handleEditProjectSubmit = (project, updateProject) => ({ projectName }) =>  (
    updateProject(project, projectName)
  );
    
  render() {
    const { handleSubmit, project, updateProject } = this.props;
    
    return (
      <form onSubmit={handleSubmit(this.handleEditProjectSubmit(project, updateProject))}>
        <div>
          <div>
            <Field
              name="projectName"
              component="input"
              type="text"
              placeholder="Project Name"
            />
          </div>
        </div>
      </form>
    );
  }
};

const submit = ({ projectName }) => {
  
}

EditProjectForm = reduxForm({
  form: 'EditProjectForm', // a unique identifier for this form
})(EditProjectForm);

EditProjectForm = connect(
  state => {
    const { /*selectedProjectId,*/ projects } = state;
    // *********************************** replace ************************
    const selectedProjectId = 'HyxHZpP7NW';
    const selectedProject = projects.items.find((project) => project.shortId === selectedProjectId); 
    const projectName = (projects.items.length > 0 && selectedProjectId) && selectedProject.projectName;
    
    return ({
      selectedProjectId, 
      initialValues: { projectName: 'harry' }, 
      project: selectedProject
    })
  }, { updateProject})(EditProjectForm);

export default EditProjectForm;
