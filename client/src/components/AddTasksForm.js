import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import List from './List';

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div className="input-wrapper">
    <label/>
    <div>
      <input {...input} autoFocus placeholder="Task name" type={type} />
      {touched &&
        ((error && <div className="error">{error}</div>) ||
        (warning && <span className="error">{warning}</span>))}
      </div>
    </div>
  );

export default class AddTasksForm extends Component {
  
  componentDidUpdate(prevProps) {
    if (prevProps.shouldSubmit !== this.props.shouldSubmit) {
      const { handleSubmit, handleFormSubmit } = this.props;
      handleSubmit(handleFormSubmit)();    
    }
  }  
  
  render() {
    const {
      submitButtonText, 
      handleFormSubmit,
      handleTaskSubmit,
      handleSubmit,
      shouldRenderSubmitButton,
      renderFormTask,
      tasks,
    } = this.props;
    
    return (
      <div>
        <List className="form-task-list" items={tasks} renderItem={renderFormTask} />
        <form className="add-tasks-form" autoComplete="off" onSubmit={handleSubmit(handleTaskSubmit)}>
          <label htmlFor="taskName" />
          <Field name="taskName" component={renderField}/>
        </form>
        { !(shouldRenderSubmitButton === false) && 
          <button className='form-button fullscreen-submit' onClick={handleSubmit(handleFormSubmit)}>{submitButtonText || "Finish"}</button>
        }
      </div>
    );
  }
}  

 
AddTasksForm.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  tasks: PropTypes.array.isRequired,
}