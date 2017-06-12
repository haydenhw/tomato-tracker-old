import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import shortid from 'shortid';

import { addTask } from '../actions/indexActions';

import AddTasksForm from '../components/AddTasksForm';

let AddTasksFormContainer = function(props) {
  const renderFormTask = task => {
    const { taskName } = task;
    
    return (
      <div className="task-form-list-item" key={shortid.generate()}>
        <span>{taskName}</span>
        <div className="button-wrapper">
          <button onClick={() => console.log('deleting task')}>&times;</button>
        </div>
      </div>
    );
  }
  
  const {
    handleSubmit,
    tasks,
  } = props;
  
  return (
    <AddTasksForm 
      handleSubmit={handleSubmit}
      handleTaskSubmit={() => console.log('hola')}
      renderFormTask={renderFormTask}
      tasks={tasks}
    />
  );
}  

const validate = values => {
  if(values) {
    
  } else {
  }
}

const mapStateToProps = (state) => {
  const projects = { state }
  const tasks = [{taskName:'pickle'}, {taskName:'trickle'}];
  
  return {
    tasks
  }
}

AddTasksFormContainer = reduxForm({
  form: 'addTasks',
  validate,
})(AddTasksFormContainer);

export default AddTasksFormContainer = connect(mapStateToProps, {
  addTask
})(AddTasksFormContainer);

AddTasksFormContainer.propTypes = {
  handleProjectSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func,
  tasks: PropTypes.array.isRequired,
}