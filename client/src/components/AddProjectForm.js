import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { postProject } from '../actions/indexActions';
import store from '../redux-files/store';

import validate from '../helpers/validate';

const submit = ({ projectName }) => {console.log('submitting...'); store.dispatch(postProject(projectName))}


const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label />
    <input
      {...input} 
      autoFocus 
      className="fullscreen-input add-project-input" 
      placeholder="Project name" 
      type={type} 
    />
    {touched && error && <div className="error">{error}</div>}
  </div>
)

function AddProjectForm(props) {
  const { handleProjectSubmit, handleSubmit, shouldRenderSubmitButton } = props;
  
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="projectName"
        type="text"
        component={renderField}
        label="projectName"
      />
      {shouldRenderSubmitButton && 
        <button className="form-button fullscreen-submit" onClick={handleSubmit(handleProjectSubmit.bind(this))}>Continue</button>
      }
    </form>
  )
}

export default reduxForm({
  form: 'addProjectForm', // a unique identifier for this form
  onSubmit: submit, // submit function must be passed to onSubmit
  validate: validate(store.getState),
})(AddProjectForm)
  
// AddProjectForm.propTypes = {
//   handleProjectSubmit: PropTypes.func,
//   handleSubmit: PropTypes.func,
// }