import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import Modal from './Modal';
import AddProjectForm from './AddProjectForm';
import AddTasksForm from './AddTasksForm';

export default class FormModal extends Component {
  
  deleteTask (taskId) {
    this.props.deleteTask('123', '111');
  }
  
  renderFormTask (task) {
    const { taskName } = task;
    
    return (
      <div className="form-task-list-item" key={shortid.generate()}>
        <span>{taskName}</span>
        <div className="button-wrapper">
          <button onClick={this.deleteTask.bind(this)}>&times;</button>
        </div>
      </div>
    );
  }
  
  renderForm() {
    const { form } = this.props;
    switch (form) {
      case "ADD_PROJECT": 
        return <AddProjectForm handleProjectSubmit={(values) => console.log(values)} />
      case "ADD_TASKS": 
        return (
          <AddTasksForm 
            handleTaskSubmit={(values) => console.log(values)}
            renderFormTask={this.renderFormTask.bind(this)}
            tasks={['one', 'two', 'three']}
          />
        ); 
      default:
        return null;
    }
  }
  
  render() {
    const { handleCloseButtonClick, shouldRenderModal } = this.props;
    return (
      <Modal 
        handleCloseButtonClick={handleCloseButtonClick}
        shouldRender={shouldRenderModal}
        style={{width: "300px"}}
        text={"Add a new project"}
        >
          {this.renderForm()}
        </Modal> 
      );
    }
  }
    
FormModal.propTypes = {
  hanldeFormSubmit: PropTypes.func,
  handleCloseButtonClick: PropTypes.func.isRequired,
  shouldRenderModal: PropTypes.bool.isRequired
}