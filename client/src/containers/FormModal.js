import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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
  constructor(){
    super();
    
    this.state = {
      isContentWaiting: true
    }
  }
  deleteTask (taskId) {
    this.props.deleteTask('123', '111');
  }
  
  handleAddProject = () => ({ projectName }) => {
    const { changeModalType, postProject } = this.props;
    
    postProject(projectName)
    this.toggleIsContentWaiting();
    changeModalType('ADD_TASKS');
  }
  
  handleGetStarted() {
    const { changeModalType } = this.props;
    
    this.toggleIsContentWaiting();
    changeModalType('ADD_PROJECT');
  }
  
  toggleIsContentWaiting() {
    const { isContentWaiting } = this.props;
    
    this.setState({isContentWaiting: true});
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
  
  renderFormElement(elementType) {
    const { activeProjectName, modalType } = this.props;
    
    switch (true) {
      case (modalType === "WELCOME") && (elementType === "TITLE"): 
      return <h2>Welcome to PomTracker!</h2>;
      
      case (modalType === "WELCOME") && (elementType === "CONTENT"): 
      return (
        <div>
          <p>Click below to add you first project</p>
          <button className="form-button" onClick={this.handleGetStarted.bind(this)}>Get Started</button>
        </div>
      );
      
      case (modalType === "ADD_PROJECT") && (elementType === "TITLE"): 
      return <h2 className="project-form-title">Add a project</h2>;
      
      case (modalType === "ADD_PROJECT") && (elementType === "CONTENT"): 
      return <AddProjectForm handleProjectSubmit={this.handleAddProject()} />
      
      case (modalType === "ADD_TASKS") && (elementType === "TITLE"): 
      return <h2 className="add-tasks-form-title">Add tasks for project  <span>{activeProjectName}</span></h2>
      
      case (modalType === "ADD_TASKS") && (elementType === "CONTENT"): 
      return <AddTasksFormContainer />
      
      default:
      return null;
    }
  }
  
  
  renderAnimatedElement(elementType) {
    const { modalType } = this.props;
    
    return (
      <ReactCSSTransitionGroup 
        transitionAppear={true}
        transitionAppearTimeout={1000}
        transitionEnter={false}
        transitionLeave={false}
        transitionName="bounceInDown"
        key={modalType + elementType}
        >
          {this.renderFormElement(elementType)}			
        </ReactCSSTransitionGroup>
      )
    }
  
  renderAnimatedForm(){
    const { isContentWaiting } = this.state;
    const { modalType } = this.props;
    
    if (isContentWaiting === true) {
      const timeoutDuration = modalType === "WELCOME" ? 1200 : 500;
      
      setTimeout(()=> this.setState({ isContentWaiting: false }), timeoutDuration);
    }
    
    return (
      <div className="fullscreen-form">
        {this.renderAnimatedElement("TITLE")}
        {!isContentWaiting && this.renderAnimatedElement("CONTENT")}
      </div>
    )
  }
  
  
  render() {
    const { handleCloseButtonClick, isFormModalActive, shouldRenderModal } = this.props;
    
    return (
      isFormModalActive &&
      <Modal 
        handleCloseButtonClick={handleCloseButtonClick}
        modalClass={""}
        shouldRender={shouldRenderModal}
        text={""}
      >
        {this.renderAnimatedForm()}
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


FormModal.propTypes = {
  hanldeFormSubmit: PropTypes.func,
  handleCloseButtonClick: PropTypes.func.isRequired,
  shouldRenderModal: PropTypes.bool.isRequired
}