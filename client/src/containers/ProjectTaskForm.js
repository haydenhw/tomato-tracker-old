// refactor to functional component
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { submit, SubmissionError } from 'redux-form';

import AddTasksFormContainer from '../containers/AddTasksFormContainer';

export default class ProjectTaskForm extends Component {
  // constructor() {
  //   super() 
  // }
  
  render() {
    const {
      children,
      handleSubmit,
      handleCancel,
      label,
      shouldDisableTaskFormFocus,
      showTasksForSelectedProject
     } = this.props;
    console.log(label) 
    return (
      <div className="form-page">
        {label && <label>{label}</label>}  
        {children}        
        <AddTasksFormContainer
          shouldDisableFocusOnMount={true}
          shouldRenderSubmitButton={false}
          showTasksForSelectedProject={showTasksForSelectedProject}
        />  
        <div className="form-button form-submit">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    );
  }
}
  
ProjectTaskForm.propTypes = {
  children: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired
}
