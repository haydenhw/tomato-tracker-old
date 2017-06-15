
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';

import { 
  addTask,
  changeModalType,
  postProject,
  setActiveProject,
} from '../actions/indexActions';

import Modal from '../components/Modal';
import AddProjectForm from '../components/AddProjectForm';
import AddTasksFormContainer from './AddTasksFormContainer';

class FormModal extends Component {
  
  deleteTask (taskId) {
    this.props.deleteTask('123', '111');
  }
  
  handleAddProject = () => ({ projectName }) => {
    const { changeModalType, postProject } = this.props;
    
    postProject(projectName)
    changeModalType('ADD_TASKS');
  }
  
  handleGetStarted() {
    const { changeModalType } = this.props;
    
    changeModalType('ADD_PROJECT');
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
    const { activeProjectName, modalType } = this.props;
    
    switch (modalType) {
      case "WELCOME": 
        return (
          <div>
            <h2>Welcome to PomTracker!</h2>
            <p>Click below to add you first project</p>
            <button onClick={this.handleGetStarted.bind(this)}>Get Started</button>
          </div>
        );
      case "ADD_PROJECT": 
        return (
          <div>
            <h2 className="project-form-title">Add a project</h2>
            <AddProjectForm handleProjectSubmit={this.handleAddProject()} />
          </div>
        );
      case "ADD_TASKS": 
        return (
          <div>
            <h2 className="add-tasks-form-title">Add tasks for project  <span>{activeProjectName}</span></h2>
            <AddTasksFormContainer />
          </div>
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
          text={""}
          >
          {this.renderForm()}
        </Modal> 
      );
    }
  }
  
  const mapStateToProps = (state) => {
    const { activeProjectId, modal, projects } = state;
    const { isFormModalActive, modalType } = modal;
    
    const activeProjectName = 
      activeProjectId
        ? projects.find(project => project.shortId === activeProjectId).projectName
        : null;
      
    return {
      activeProjectName,
      isFormModalActive,
      modalType
    }
  }
  
  export default connect(mapStateToProps, {
    addTask,
    changeModalType,
    postProject,
    setActiveProject
  })(FormModal);
  
  
  // FormModal.propTypes = {
  //   hanldeFormSubmit: PropTypes.func,
  //   handleCloseButtonClick: PropTypes.func.isRequired,
  //   shouldRenderModal: PropTypes.bool.isRequired
  // }