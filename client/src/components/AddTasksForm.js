import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import List from './List';

let renderField = (placeholder, inputRef) => ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div className="input-wrapper">
    <label/>
    <div>
      <input
        {...input}
        // ref={inputRef}
        placeholder={placeholder}
        type={type}
      //  onBlur={() => {}}
       />
      {touched && (error && <div className="error">{error}</div>)}
      </div>
    </div>
  );



export default class AddTasksForm extends Component {
  componentWillMount() {
    this.renderField = renderField('Test place',  el => this.inputRef = el);
    console.log('hello')
    
    
  }
  
  
  componentDidMount() {
    // this.inputRef.focus();
    
    
  }
  
  
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
      inputRef,
      shouldRenderSubmitButton,
      renderFormTask,
      tasks,
    } = this.props;
    
    return (
      <div>
        <label htmlFor="taskName">Tasks</label>
        <List className="form-task-list" items={tasks} renderItem={renderFormTask} />
        <form className="add-tasks-form" autoComplete="off" onSubmit={handleSubmit(handleTaskSubmit)}>
          <Field name="taskName" component={this.renderField}/>
        </form>
          {!(shouldRenderSubmitButton === false) && 
            <button className='form-button fullscreen-submit' onClick={handleSubmit(handleFormSubmit)}>{submitButtonText || "Finish"}</button>
          }
      </div>
    );
  }
}  
 
AddTasksForm.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  tasks: PropTypes.array
}