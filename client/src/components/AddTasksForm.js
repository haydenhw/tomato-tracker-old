import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';

import List from './List';

class AddTasksForm extends Component {
  render() {
    const {
      handleTaskSubmit,
      handleSubmit,
      tasks,
      renderFormTask
    } = this.props;
    return (
      <div>
        <List className='form-task-list' items={tasks} renderItem={renderFormTask} />
        
        <form onSubmit={handleSubmit(handleTaskSubmit.bind(this))}>
          <label htmlFor="ad">Add Task</label>
          <Field name="taskName" component="input" type="text"/>
        </form>
        
        <button  type="submit">Add Task</button>
    </div>
  );
}
}

const validate = values => {
  if(values) {
    
    } else {
  }
}
 
AddTasksForm = reduxForm({
  form: 'addProjec',
  validate,
})(AddTasksForm);

export default AddTasksForm;

AddTasksForm.propTypes = {
  handleProjectSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  tasks: PropTypes.array.isRequired,
}