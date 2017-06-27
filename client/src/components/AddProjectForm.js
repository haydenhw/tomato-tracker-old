import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import { postProject } from '../actions/indexActions';
import store from '../redux-files/store';

import validate from '../helpers/validate';

const submit = ({ projectName }) => {store.dispatch(postProject(projectName))}

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
    const { handleProjectSubmit, handleSubmit, shouldRenderSubmitButton } = this.props;
      
    return (
      <div>
        {/* <form autoComplete="off" id="project-form" className="project-form" onSubmit={handleSubmit}> */}
          <div>
            <label htmlFor="projectName"/>
            <Field name="projectName" component={renderField} placeholder="Project name"/>
            {shouldRenderSubmitButton && 
              <button className="form-button fullscreen-submit" onClick={handleSubmit(handleProjectSubmit.bind(this))}>Continue</button>
            }
          </div>
        {/* </form> */}
      </div>
    );
  }
}
  
AddProjectForm = reduxForm({
  form: 'addProject',
  validate: validate(store.getState),
  onSubmit: submit
})(AddProjectForm);

export default AddProjectForm;
  
AddProjectForm.propTypes = {
  handleProjectSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
}