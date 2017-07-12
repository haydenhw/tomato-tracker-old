import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { hashHistory } from 'react-router';

import { updateProject } from '../actions/indexActions';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label />
    <input
      {...input} 
      autoFocus 
      autoComplete="off"
      className="fullscreen-input add-project-input" 
      placeholder="Project name" 
      type={type} 
    />
    {touched && error && <div className="error">{error}</div>}
  </div>
)

let EditProjectForm = class extends Component {
  componentWillMount() {
    const { project } = this.props;
    
    if (!project) {
      hashHistory.push('/projects'); 
    }
  }
    
  componentDidUpdate(prevProps) {
    if (prevProps.shouldSubmit !== this.props.shouldSubmit) {
      const { handleSubmit, handleEditProjectSubmit, project, updateProject } = this.props;
      handleSubmit(handleEditProjectSubmit(project, updateProject))();
    }
  }  
  
  handleEditProjectSubmit = (project, updateProject) => ({ projectName }) =>  (
    updateProject(project, projectName)
  );
    
  render() {
    const { handleSubmit, handleEditProjectSubmit, project, updateProject } = this.props;
    
    return (
      <form onSubmit={handleSubmit(handleEditProjectSubmit(project, updateProject))}>
        <div>
          <div>
            <Field
              name="projectName"
              component={renderField}
              type="text"
              placeholder="Project Name"
            />
          </div>
        </div>
      </form>
    );
  }
};

const mapStateToProps = state => {
    const { selectedProjectId, projects } = state;
    
    const selectedProject = projects.items.find((project) => project.shortId === selectedProjectId); 
    const projectName = (projects.items.length > 0 && selectedProjectId) && selectedProject.projectName;
    
    return ({
      selectedProjectId, 
      initialValues: { projectName }, 
      project: selectedProject
    })
}

EditProjectForm = reduxForm({
  form: 'EditProjectForm', // a unique identifier for this form
})(EditProjectForm);

EditProjectForm = connect(mapStateToProps , { updateProject })(EditProjectForm);

export default EditProjectForm;
