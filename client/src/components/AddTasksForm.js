import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import callOnTargetUpdate from '../hocs/callOnTargetUpdate';

import List from './List';

let renderField = (placeholder, inputRef) => ({
  input,
  label,
  type,
  meta: {  error, pristine, touched }
}) => (
  <div className="input-wrapper">
    <label/>
    <div>
      <input
        {...input}
        ref={inputRef}
        placeholder="Task Name"
        type={type}
       />
       <div className={(touched && error) && 'error' }>
         {/* 'press ENTER to submit task' */}
         {(touched && error ) ? error : ''} 
       </div>
       
      </div>
    </div>
  );

let AddTasksForm = class extends Component {
  componentWillMount() {
    const { shouldDisableFocusOnMount } = this.props;
    const getRef = !shouldDisableFocusOnMount 
      ?  el => this.inputRef = el 
      : () => {};
      
    this.renderField = renderField('Add Task', getRef);
  }
  
  componentDidMount() {
    const { shouldDisableFocusOnMount } = this.props;
    
    if (!shouldDisableFocusOnMount) {
      this.inputRef.focus();
    }
  }
  
  // componentDidUpdate(prevProps) {
  //   //  console.log(this.props.remoteSubmitForm, 'updating!');
  //   if (prevProps.shouldSubmit !== this.props.shouldSubmit) {
  //     const { handleSubmit, handleFormSubmit } = this.props;
  //     
  //     handleSubmit(handleFormSubmit)();    
  //   }
  // }  
  
  render() {
    const {
      submitButtonText, 
      handleFormSubmit,
      handleTaskSubmit,
      handleSubmit,
      inputRef,
      shouldRenderSubmitButton,
      renderFormTask,
      tasks,
    } = this.props;
    
    return (
      <div className="add-tasks-form">
        <div className="field-wrapper">
          <label htmlFor="taskName">Tasks</label>
          <List className="form-task-list" items={tasks} renderItem={renderFormTask} />
          <form className="add-tasks-form" autoComplete="off" onSubmit={handleSubmit(handleTaskSubmit)}>
            <Field name="taskName" component={this.renderField}/>
          </form>
        </div>
          {!(shouldRenderSubmitButton === false) && 
            <button className='form-button form-submit' onClick={handleSubmit(handleFormSubmit)}>{submitButtonText || "Finish"}</button>
          }
      </div>
    );
  }
}  
 
const targetInfo = props => {
  return {
    targetValue: "ADD_TASKS",
    targetPropKey: "remoteSubmitForm" 
  } 
}

const onTargetUpdate = props => {
  const { handleSubmit, onTargetUpdate } = props;
    handleSubmit(onTargetUpdate)();
}
 
export default AddTasksForm = callOnTargetUpdate(targetInfo, onTargetUpdate)(AddTasksForm);
 
AddTasksForm.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  tasks: PropTypes.array
}