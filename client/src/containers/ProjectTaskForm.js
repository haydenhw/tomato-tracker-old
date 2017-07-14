import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import { reduxForm } from 'redux-form';
import { submit, SubmissionError } from 'redux-form';

import AddTasksFormContainer from '../containers/AddTasksFormContainer';
import RemoteSubmitForm from '../containers/RemoteSubmitForm';

const routeToProjects = () => hashHistory.push('/projects');

export default class ProjectTaskForm extends Component {
  // constructor() {
  //   super() 
  // }
  
  
  handleRemoteSubmit() {
    const { remoteSubmit } = this.props;
    
    remoteSubmit('ADD_PROJECT');  
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
