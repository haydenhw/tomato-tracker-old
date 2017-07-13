import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import { submit, SubmissionError } from 'redux-form';

import AddTasksFormContainer from '../containers/AddTasksFormContainer';
import AddProjectForm from '../components/AddProjectForm';
import RemoteSubmitForm from '../containers/RemoteSubmitForm';

const routeToProjects = () => hashHistory.push('/projects');

export default class ProjectTaskForm extends Component {
  constructor() {
    super() 
      this.state = {
        newTasks: [],
        shouldSubmit: false
      }
  }
  
  componentDidUpdate(prevProps) {
    const { handleComponentUpdate } = this.props;
    
    if (handleComponentUpdate) {
      handleComponentUpdate.call(this, prevProps);  
    }  
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
      handleFormSubmit,
      handleTasksSubmit,
      isDefaultTaskSubmitDisabled,
      showTasksForSelectedProject,
     } = this.props;
    const { shouldSubmit } = this.state;  
    
    return(
      <div>
        <label>Project Name</label>
        <RemoteSubmitForm
          handleProjectSubmit={({ projectName }) => { console.log('projectName')}} 
          onTargetUpdate={() => { console.log('success!')}}
          targetValue="ADD_PROJECT" 
          targetPropKey="remoteSubmitForm"
        >
          {children}
        </RemoteSubmitForm>
        <AddTasksFormContainer
          handleFormSubmit={(isDefaultTaskSubmitDisabled === true) && this.handleFormSubmit}
          shouldSubmit={shouldSubmit}
          shouldRenderSubmitButton={false}
          showTasksForSelectedProject={false || showTasksForSelectedProject}
        />  
        <button onClick={handleFormSubmit}>Submit</button>
        <button onClick={routeToProjects}>Cancel</button>
      </div>
      );
    }
  }
  
  ProjectTaskForm.propTypes = {
    queuedProject: PropTypes.string
  }