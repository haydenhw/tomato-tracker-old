import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';

import { 
  addProject,
  addTask,
  changeModalType
} from '../actions/indexActions';



import Modal from '../components/Modal';
import AddProjectForm from '../components/AddProjectForm';
import AddTasksFormContainer from './AddTasksFormContainer';

class FormModal extends Component {
  
  deleteTask (taskId) {
    this.props.deleteTask('123', '111');
  }
  
  handleAddProject = () => ({ projectName }) => {
    const { addProject, changeModalType } = this.props;
    addProject(projectName)
    changeModalType('ADD_TASK');
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
    const { modalType } = this.props;
    switch (modalType) {
      case "ADD_PROJECT": 
      return <AddProjectForm handleProjectSubmit={this.handleAddProject()} />
      case "ADD_TASKS": 
      return (
        <AddTasksFormContainer />
      ); 
      default:
      return null;
    }
  }
  
  render() {
    const { handleCloseButtonClick, isFormModalActive, shouldRenderModal } = this.props;
    return (
      isFormModalActive &&
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
  
  const mapStateToProps = (state) => {
    const { modal } = state;
    const { isFormModalActive, modalType } = modal;
    
    return {
      isFormModalActive,
      modalType
    }
  }
  
  export default connect(mapStateToProps, {
    addProject,
    addTask,
  })(FormModal);
  
  
  // FormModal.propTypes = {
  //   hanldeFormSubmit: PropTypes.func,
  //   handleCloseButtonClick: PropTypes.func.isRequired,
  //   shouldRenderModal: PropTypes.bool.isRequired
  // }