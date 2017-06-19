import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import List from './List';

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label/>
    <div>
      <input {...input} autoFocus className="fullscreen-input add-project-input" placeholder="Project name" type={type} />
      {touched &&
        ((error && <div className="error">{error}</div>) ||
        (warning && <span className="error">{warning}</span>))}
      </div>
    </div>
  );

class AddProjectForm extends Component {
  render() {
    const {
      error,
      handleProjectSubmit,
      handleSubmit,
      projectName,
      touched
    } = this.props;
      
      return (
        <div>
          <form autocomplete="off" id="project-form" className="project-form" onSubmit={handleSubmit(handleProjectSubmit.bind(this))}>
            <div>
              <label htmlFor="projectName"/>
              <Field name="projectName" component={renderField} placeholder="Project name"/>
              <button type="submit">Continue</button>
              {/* {projectName.touched && error.projectName && <div>{error.projectName}</div> } */}
            </div>
          </form>
        </div>
      );
    }
  }
  
  function isUndefined(value) {
    if (typeof value === 'undefined' || value === undefined) {
      return true;
    }
    return false;
  }
  
  function hasAnyValue(value) {
    if (isUndefined(value) || String(value).trim() === '') {
      return false;
    }
    return true;
  }
  
  const validate = (testArg, { projectName }) => {
    const error = {};
    if (!hasAnyValue(projectName)) {
      error.projectName = "Project name is required" 
    } else {
      
    }
    return error;
  }
  
  AddProjectForm = reduxForm({
    form: 'addProject',
    validate: validate.bind(null,"hello"),
  })(AddProjectForm);
  
  export default AddProjectForm;
  
  /*AddProjectForm.propTypes = {
  handleProjectSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
}*/