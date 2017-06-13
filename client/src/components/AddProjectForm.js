import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import List from './List';

class AddProjectForm extends Component {
  render() {
    const {
      error,
      handleProjectSubmit,
      handleSubmit,
      projectName,
      touched
    } = this.props;
    console.log(this.props)
    return (
      <div>
        <form id="project-form" className="project-form" onSubmit={handleSubmit(handleProjectSubmit.bind(this))}>
          <div>
            <label htmlFor="projectName"/>
            <Field name="projectName" component="input" placeholder="Project name"/>
            <button type="submit">Sumbit</button>
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

const validate = ({ projectName }) => {
  
  
  const error = {};
  if (!hasAnyValue(projectName)) {
      error.projectName = "Project name is required" 
    } else {
      
  }

  console.log(error)
  return error;
}
 
AddProjectForm = reduxForm({
  form: 'addProject',
  validate,
})(AddProjectForm);

export default AddProjectForm;

/*AddProjectForm.propTypes = {
  handleProjectSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
}*/