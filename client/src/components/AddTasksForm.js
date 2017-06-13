import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import List from './List';

export default function AddTasksForm(props) {
    const {
      handleFormSubmit,
      handleTaskSubmit,
      handleSubmit,
      renderFormTask,
      tasks,
    } = props;
    
    return (
      <div>
        <List className='form-task-list' items={tasks} renderItem={renderFormTask} />
        <form autoComplete="off" onSubmit={handleSubmit(handleTaskSubmit)}>
          <label htmlFor="add-task-form" />
          <Field name="taskName" component="input" placeholder="Task name"/>
        </form>
        
        <button className='add-task-form-submit' onClick={handleFormSubmit}>Submit</button>
    </div>
  );
}

const validate = values => {
  if(values) {
    
    } else {
  }
}
 
/*AddTasksForm = reduxForm({
  form: 'addProjec',
  validate,
})(AddTasksForm);

export default AddTasksForm;*/

/*AddTasksForm.propTypes = {
  handleProjectSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  tasks: PropTypes.array.isRequired,
}*/