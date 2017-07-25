import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, SubmissionError } from 'redux-form';

import callOnTargetUpdate from '../hocs/callOnTargetUpdate';
// import { queueNewProject } from '../actions/indexActions';
import store from '../redux-files/store';

import validate, { hasAnyValue } from '../helpers/validate';

const renderField = (props) => {
  
  const { input, type, meta: { touched, error }} = props;
  return (
    <div>
      <input
        {...input} 
        autoFocus
        autoComplete="off"
        className="fullscreen-input add-project-input" 
        placeholder={"Project Name"} 
        type={type} 
      />
      {touched && error && <div className="error">{error}</div>}
    </div>
  )
} 

let SingleInputForm = function SingleInputForm(props) {
  const {
    formName,
    handleFormSubmit,
    handleSubmit,
    inputRef,
    placeholder,
    shouldRenderSubmitButton
  } = props;
  
  return (
    <div className="form-wrapper">
      <form className="form" onSubmit={(evt) => { evt.preventDefault(); console.log('submitting'); return false } }>
        <Field
          name="singleInput"
          type="text"
          component={renderField}
        />
      </form>
      {shouldRenderSubmitButton && 
        <button className="fadeInButton form-submit" onClick={handleSubmit(handleFormSubmit)}>Continue</button>
      }
    </div>
  );
}


const submit = ({ projectName }) =>  {
  
    console.log('hola hola')
  // const shouldSubmitProjectForm = store.getState().customForm.shouldSubmitProjectForm;
  // console.log(shouldSubmitProjectForm);
  // if (!shouldSubmitProjectFo   rm) {
  //   return;  
  // }
  
  if (!hasAnyValue(projectName)) {
    throw new SubmissionError({
      singleInput: 'Project name is required' 
    })
  }
  
  // store.dispatch(queueNewProject(projectName));
};

const targetInfo = props => {
  return {
    targetValue: "ADD_PROJECT",
    targetPropKey: "remoteSubmitForm" 
  } 
}

const onTargetUpdate = props => {
  const { handleSubmit, onTargetUpdate } = props;
    handleSubmit(onTargetUpdate)();
}

SingleInputForm = callOnTargetUpdate(targetInfo, onTargetUpdate)(SingleInputForm);

export default reduxForm({
  form: 'singleInput', 
  // validate: validate(store.getState),
})(SingleInputForm)

// SingleInputForm.propTypes = {
//   handleProjectSubmit: PropTypes.func,
//   handleSubmit: PropTypes.func,
// }