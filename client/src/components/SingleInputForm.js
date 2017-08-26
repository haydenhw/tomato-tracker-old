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
        className="form-input fullscreen-input add-project-input" 
        placeholder={"Project Name"} 
        type={type} 
      />
      {touched && error && <div className="form-error">{error}</div>}
    </div>
  )
} 

const dummySubmit = (evt) => { 
  evt.preventDefault(); 
  return false; 
}

let SingleInputForm = function SingleInputForm(props) {
  const {
    handleFormSubmit,
    handleSubmit,
    isModalActive,
    isOnlyInput,
    shouldRenderSubmitButton,
    title,
    titleName
  } = props;
  
  return (
    <div className={`${isModalActive ? "fullscreen-container": ""}`}>
      <div className={`${isModalActive ? "form-container": "" }`}>
        <form onSubmit={isOnlyInput ? handleSubmit(handleFormSubmit) : dummySubmit}>
          {title && 
            <h2 className="form-title bounceInDown">
              {title}  
              {titleName && <span className='grey-title-text'>{titleName}</span>}
            </h2>
          }
          <div className="bounceInDown-second">
            <Field
              component={renderField}
              name="singleInput"
              type="text"
            />
          </div>
        </form>
      </div>
      {shouldRenderSubmitButton && 
        <button className="fadeInButton outline-button modal-button-bottom-right" onClick={handleSubmit(handleFormSubmit)}>Continue</button>
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