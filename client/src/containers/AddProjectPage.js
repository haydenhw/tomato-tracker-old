import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { submit, SubmissionError } from 'redux-form';

import validate, { hasAnyValue } from '../helpers/validate';
import { postProject } from '../actions/indexActions';

//delete
import store from '../redux-files/store.js';

import AddProjectForm from '../components/AddProjectForm';
import ProjectTaskForm from './ProjectTaskForm';

let AddProjectPage = class extends Component {
  handleComponentUpdate(prevProps) {
    if (prevProps.queuedProject !== this.props.queuedProject) {
      const { postProject, queuedProject } = this.props;
      const { newTasks } = this.state;
      
      postProject(queuedProject, newTasks);
      hashHistory.push('/projects');
    }
  }
  
  handleFormSubmit() {
    const { dispatch } = this.props;
    
    store.dispatch({
      type: "REMOTE_SUBMIT",
      formSelector: "ADD_PROJECT"
    })
  }
  
  handleQueNewProject({ projectName }) {
    const { queueNewProject } = this.props;
    
    if (!hasAnyValue(projectName)) {
      throw new SubmissionError({
        projectName: 'Project name is required' 
      })
    }
    
    queueNewProject(projectName);
  };
  
  handleAddNewProject() {
    const { newTasks, projectName } = this.props;
    postProject(newTasks, projectName)
  }  
  
  render() {
    const { dispatch, postProject, queuedProject } = this.props; 
    
    return(
      <div>
        <ProjectTaskForm 
          handleFormSubmit={this.handleFormSubmit.bind(this)}
          handleProjectSubmit={this.handleQueNewProject.bind(this)}
          isDefaultTaskSubmitDisabled={true}
        >
          <AddProjectForm shouldRenderSubmitButton={false} />
        </ProjectTaskForm>  
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

  export default AddProjectPage = connect(mapStateToProps, (dispatch) => ({
    dispatch,
    postProject,
    submit
  }))(AddProjectPage);
  
  AddProjectPage.propTypes = {
    queuedProject: PropTypes.string
  }