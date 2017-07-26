import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';

import { secondsToHMMSS, timeStringToSeconds } from '../helpers/time';
import { hasAnyValue, isDuplicate } from '../helpers/validate';
import { confirmEditTask, updateTask } from '../actions/indexActions';

import 'rc-time-picker/assets/index.css';

const renderField = ({
  input,
  type,
  meta: { touched, error, warning }
}) => (
  <div className="input-wrapper">
    <div>
      <input {...input} placeholder="Task name" type={type} />
      {touched &&
        ((error && <div className="error">{error}</div>) ||
        (warning && <span className="error">{warning}</span>))}
      </div>
    </div>
  )
  
  let EditTaskForm = class extends Component {
    handleEditTaskSubmit ({ taskName, newTime }) {
      const {
        selectedProjectId,
        clickedTaskId,
        confirmEditTask,
        updateTask,
        initialValues,
        selectedProject,
        selectedTask,
        taskNames,
      } = this.props
      const newTimeString = timeStringToSeconds(newTime);
      
      if (taskName !== initialValues.taskName && isDuplicate(taskName, taskNames)){
        throw new SubmissionError({
          taskName: `A task with the name ${taskName} already exits`
        });      
      }
      
      if (!hasAnyValue(taskName)){
        throw new SubmissionError({
          taskName: `This field cannot be left blank`
        });      
      }
      
      if (isNaN(newTimeString)) {
        throw new SubmissionError({
          newTime: 'Please enter a numberic time'
        });
      }
      
      const toUpdate = {
        taskName,
        recordedTime: newTimeString
      } 
      
      if (secondsToHMMSS(newTimeString)  !== initialValues.newTime)  {
        confirmEditTask({
          taskName,
          payload:  [selectedProject, selectedTask, toUpdate],
          oldTime: initialValues.newTime,
          newTime: secondsToHMMSS(newTimeString) 
        })
      } else if (taskName !== initialValues.taskName) {
        updateTask(selectedProject, selectedTask, toUpdate);
      }
    }
    
  render() {
    const { handleSubmit, initialValues } = this.props;
    
    return (
      <div className="form-container">
        <h2 className="form-title bounceInDown">Edit Task</h2>
        <form className="form" onSubmit={handleSubmit(this.handleEditTaskSubmit.bind(this))}>
          <div className="field-wrapper">
            <label>Task Name</label>
            <Field
              name="taskName"
              component={renderField}
              type="text"
            />
          </div>
          <div className="field-wrapper">
            <label>Logged Time: {initialValues.recordedTime}</label>
            <Field
              name="newTime"
              component={renderField}
              type="text"
            />
          </div>
        </form>
        <button className="form-button form-submit" type="submit">Submit</button>
      </div>
    );
  }
};
// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
EditTaskForm = reduxForm({
  form: 'EditTaskForm', // a unique identifier for this form
})(EditTaskForm);

const mapStateToProps = (state, ownProps) => {
  const { clickedTaskId, selectedProjectId, projects } = state;
  
  const selectedProject = projects.items.find((project) => project.shortId === selectedProjectId);  
  const selectedTask = projects.items.concatMap((project) => project.tasks).find((task) => clickedTaskId === task.shortId) 
  const taskNames = selectedProject.tasks.map((task) => task.taskName);
  
  return ({
    clickedTaskId, 
    selectedProjectId,
    selectedProject,
    selectedTask,
    taskNames, 
    initialValues: {
      taskName: selectedTask.taskName,
      newTime: secondsToHMMSS(selectedTask.recordedTime)
    },
  })
}

EditTaskForm = connect( mapStateToProps, { 
  confirmEditTask,
  updateTask
 })(EditTaskForm);

export default EditTaskForm;
