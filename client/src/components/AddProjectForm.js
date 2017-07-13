import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, SubmissionError } from 'redux-form';

// import { queueNewProject } from '../actions/indexActions';
import store from '../redux-files/store';

import validate, { hasAnyValue } from '../helpers/validate';

let renderField = ({ input, label, type, meta: { touched, error } }) => (
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

class AddProjectForm extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.shouldSubmit !== this.props.shouldSubmit) {
      const { handleSubmit, handleProjectSubmit } = this.props;     
      handleSubmit(handleProjectSubmit);
    }
  }
  
  render() {
    const { handleProjectSubmit, handleSubmit, shouldRenderSubmitButton } = this.props;
    
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
}

const submit = ({ projectName }) =>  {
  if (!hasAnyValue(projectName)) {
    throw new SubmissionError({
      projectName: 'Project name is required' 
    })
  }
  
  // store.dispatch(queueNewProject(projectName));
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