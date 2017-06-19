import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { editProjectName } from '../actions/indexActions';



let EditProjectForm = props => {
  const { activeProjectId, handleSubmit , editProjectName } = props;
    
  const handleEditProjectSubmit = ({ projectName }) => {
    editProjectName(activeProjectId, projectName);
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
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
EditProjectForm = reduxForm({
  form: 'initializeFromState', // a unique identifier for this form
})(EditProjectForm);

// You have to connect() to any reducers that you wish to connect to yourself
EditProjectForm = connect(
  state => {
    const { activeProjectId, projects } = state;
    
    const projectName = state.projects.length && activeProjectId 
    ? projects.find((project) => project.shortId === activeProjectId).projectName
    : 'No Projects Loaded'
    
    return ({
      activeProjectId, 
      initialValues: { projectName }, 
    })
  }
)(EditProjectForm);

export default EditProjectForm;
