import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import List from './List';

class AddProjectForm extends Component {
  render() {
    const {
      handleProjectSubmit,
      handleSubmit
    } = this.props;
    
    return (
      <div>
        <form id="project-form" className="project-form" onSubmit={handleSubmit(handleProjectSubmit.bind(this))}>
          <div>
            <label htmlFor="projectName">Add Project</label>
            <Field name="projectName" component="input" placeholder="Enter a project"/>
            <button type="submit">Sumbit</button>
          </div>
        </form>
      </div>
    );
  }
}

const validate = values => {
  if(values) {
    
    } else {
  }
}
 
AddProjectForm = reduxForm({
  form: 'addProject',
  validate,
})(AddProjectForm);

export default AddProjectForm;

AddProjectForm.propTypes = {
  handleProjectSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
}