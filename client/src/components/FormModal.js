import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';

import { addProject, addTask } from '../actions/indexActions';

import Modal from './Modal';
import AddProjectForm from './AddProjectForm';
import AddTasksForm from './AddTasksForm';

class FormModal extends Component {
  
  deleteTask (taskId) {
    this.props.deleteTask('123', '111');
  }
  
  handleAddProject = () => ({ projectName }) => {
    const { addProject } = this.props;
    addProject(projectName)
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
        return <AddProjectForm handleProjectSubmit={this.handleAddProject()} />
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
  
const mapStateToProps = () => {

}

export default connect(null, {
  addProject,
  addTask,
})(FormModal);

    
FormModal.propTypes = {
  hanldeFormSubmit: PropTypes.func,
  handleCloseButtonClick: PropTypes.func.isRequired,
  shouldRenderModal: PropTypes.bool.isRequired
}