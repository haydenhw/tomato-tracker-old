import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { hashHistory } from 'react-router';

import { queueNewProject } from '../actions/indexActions';
import store from '../redux-files/store';

import validate, { hasAnyValue } from '../helpers/validate';

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
  );
}

const submit = ({ projectName }) =>  {
    console.log('hello for submit')
  if (!hasAnyValue(projectName)) {
      throw new SubmissionError({
        projectName: 'Project name is required' 
      })
    }
  
  store.dispatch(queueNewProject(projectName));
};

export default reduxForm({
  form: 'addProjectForm', 
  onSubmit: submit, 
  validate: validate(store.getState),
})(AddProjectForm)
  
// AddProjectForm.propTypes = {
//   handleProjectSubmit: PropTypes.func,
//   handleSubmit: PropTypes.func,
// }