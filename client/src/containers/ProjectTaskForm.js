import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import { reduxForm } from 'redux-form';
import { submit, SubmissionError } from 'redux-form';

//delete
import store from '../redux-files/store.js';

import AddTasksFormContainer from '../containers/AddTasksFormContainer';
import RemoteSubmitForm from '../containers/RemoteSubmitForm';

const routeToProjects = () => hashHistory.push('/projects');

export default class ProjectTaskForm extends Component {
  constructor() {
    super() 
      this.state = {
        newTasks: [],
        shouldSubmit: false
      }
  this.getInputRef = this.getInputRef.bind(this);  
  }
  
  getInputRef(el) { return this.inputRef= el } 
  
  componentDidMount() {
    // this.inputRef.focus()  
  }
  
  componentDidUpdate(prevProps) {
    const { handleComponentUpdate } = this.props;
    // this.inputRef.focus(); 
    if (handleComponentUpdate) {
      handleComponentUpdate.call(this, prevProps);  
    }  
  }
  
    
  handleRemoteSubmit() {
    const { dispatch } = this.props;
    
    store.dispatch({
      type: "REMOTE_SUBMIT",
      formSelector: "ADD_PROJECT"
    })
  }
  
  handleFormSubmit = (tasks) => () => {
    const { dispatch, handleProjectSubmit } = this.props;
    
    if (tasks.length === 0) {
      throw new SubmissionError({
        taskName: 'Please add at least one task'
      })
    }    
    
    this.setState({ 
      newTasks: tasks.filter(task => !task.shouldDelete)
    }, handleProjectSubmit);
  }  
  
  toggleShouldSubmit() {
    const { shouldSubmit } = this.state;
    
    this.setState({ shouldSubmit: !shouldSubmit});
  }
  
  render() {
    const {
      children,
      handleNewProjectSubmit,
      handleSubmit,
      handleTasksSubmit,
      isDefaultTaskSubmitDisabled,
      showTasksForSelectedProject,
     } = this.props;
    const { shouldSubmit } = this.state;  
    return(
      <div>
        <label>Project Name</label>
        <RemoteSubmitForm
          //handleProjectSubmit={({ projectName }) => { console.log(projectName)}} 
          onTargetUpdate={handleNewProjectSubmit}
          targetValue="ADD_PROJECT" 
          targetPropKey="remoteSubmitForm"
        >
          {/* {children} */}
          {React.cloneElement(children, { inputRef: this.getInputRef })}
        </RemoteSubmitForm>
        <AddTasksFormContainer
          handleFormSubmit={(isDefaultTaskSubmitDisabled === true) && this.handleFormSubmit}
          shouldSubmit={shouldSubmit}
          shouldRenderSubmitButton={false}
          showTasksForSelectedProject={false || showTasksForSelectedProject}
        />  
        <button onClick={this.handleRemoteSubmit.bind(this)}>Submit</button>
        <button onClick={routeToProjects}>Cancel</button>
      </div>
      );
    }
  }
  
  ProjectTaskForm.propTypes = {
    queuedProject: PropTypes.string
  }
