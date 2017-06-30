import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';

import AddTasksFormContainer from '../containers/AddTasksFormContainer';

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
    
    handleComponentUpdate(prevProps);  
  }
  
  toggleShouldSubmit() {
    const { shouldSubmit } = this.state;
    
    this.setState({ shouldSubmit: !shouldSubmit});
  }
  
  render() {
    const { children, handleProjectSubmit } = this.props;
    const { shouldSubmit } = this.state;  
    return(
      <div>
        <label>Project Name</label>
        {children}
        <AddTasksFormContainer
          handleFormSubmit={handleProjectSubmit}
          shouldSubmit={shouldSubmit}
          shouldRenderSubmitButton={false}
          showTasksForSelectedProject={false}
        />  
        <button onClick={this.toggleShouldSubmit.bind(this)}>Submit</button>
        <button onClick={routeToProjects}>Cancel</button>
      </div>
      );
    }
  }
  
  ProjectTaskForm.propTypes = {
    queuedProject: PropTypes.string
  }