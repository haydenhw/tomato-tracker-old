import React from 'react';
import PropTypes from 'prop-types';
import { Field, SubmissionError } from 'redux-form';

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

export default function AddTasksForm(props) {
    const {
      error,
      handleFormSubmit,
      handleTaskSubmit,
      handleSubmit,
      renderFormTask,
      tasks,
    } = props;
    
    return (
      <div>
        <List className="form-task-list" items={tasks} renderItem={renderFormTask} />
        <form className="add-tasks-form" autoComplete="off" onSubmit={handleSubmit(handleTaskSubmit)}>
          <label htmlFor="taskName" />
          <Field name="taskName" component={renderField}/>
        </form>
        
        <button className='form-button fullscreen-submit' onClick={handleSubmit(handleFormSubmit)}>Finish</button>
    </div>
  );
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