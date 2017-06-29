import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { submit, SubmissionError } from 'redux-form';

import { postProject } from '../actions/indexActions';

import AddProjectForm from '../components/AddProjectForm';
import AddTasksFormContainer from './AddTasksFormContainer';

let AddProjectPage = class extends Component {
  constructor() {
    super() 
      this.state = {
        newTasks: []
      }
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.queuedProject !== this.props.queuedProject) {
      const { postProject, queuedProject } = this.props;
      const { newTasks } = this.state;
      
      postProject(queuedProject, newTasks);
      hashHistory.push('/projects');
    }
  }
  
  handleProjectSubmit = (tasks) => () => {
    const { submit } = this.props;
    
    
    
    if (!tasks.length) {
      throw new SubmissionError({
        taskName: 'Please add at least one task'
      })
    }    
    
    this.setState({ 
      newTasks: tasks.filter(task => !task.shouldDelete)
    }, 
    () => submit('addProjectForm'));
  }
  
  testSubmit(){
    const { submit, postProject } = this.props;
    submit('addProjectForm')  
  }
  
  render() {
    
    return(
      <div>
        <label>Project Name</label>
        <AddProjectForm shouldRenderSubmitButton={false} />
        <AddTasksFormContainer  handleFormSubmit={this.handleProjectSubmit} showTasksForSelectedProject={false}/>  
        </div>
      );
    }
  }
  const mapStateToProps = state => {
    const { projects } = state;
    
    return {
      queuedProject: projects.queue
    }
  }

  export default AddProjectPage = connect(mapStateToProps, {
    postProject,
    submit
  })(AddProjectPage);
  
  
  AddProjectPage.propTypes = {
    //taskData: PropTypes.object.isRequired
  }