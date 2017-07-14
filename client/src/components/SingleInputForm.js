import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, SubmissionError } from 'redux-form';

import callOnTargetUpdate from '../hocs/callOnTargetUpdate';
// import { queueNewProject } from '../actions/indexActions';
import store from '../redux-files/store';

import validate, { hasAnyValue } from '../helpers/validate';

const renderField = (placeholder) => ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label />
    <input
      {...input} 
      autoFocus 
      autoComplete="off"
      className="fullscreen-input add-project-input" 
      placeholder={placeholder} 
      type={type} 
    />
    {touched && error && <div className="error">{error}</div>}
  </div>
)


let SingleInputForm = function SingleInputForm(props) {
  const {
    formName,
    handleFormSubmit,
    handleSubmit,
    placeholder,
    shouldRenderSubmitButton
  } = props;
  
  return (
    <form>
      <Field
        name={formName}
        type="text"
        component={renderField(placeholder)}
        label={formName}
      />
      {shouldRenderSubmitButton && 
        <button className="form-button fullscreen-submit" onClick={handleSubmit(handleFormSubmit.bind(this))}>Continue</button>
      }
    </form>
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
  validate: validate(store.getState),
})(SingleInputForm)

// SingleInputForm.propTypes = {
//   handleProjectSubmit: PropTypes.func,
//   handleSubmit: PropTypes.func,
// }