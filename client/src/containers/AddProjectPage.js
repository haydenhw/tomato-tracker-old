import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import { postProject, remoteSubmit } from '../actions/indexActions';
import validate, { hasAnyValue } from '../helpers/validate';

import SingleInputForm from '../components/SingleInputForm';
import ProjectTaskForm from './ProjectTaskForm';

import store from '../redux-files/store';

let AddProjectPage = class extends Component {
  handleNewProjectSubmit({ singleInput: projectName }) {
    const { newTasks, postProject } = this.props;
    
    if (!hasAnyValue(projectName)) {
      throw new SubmissionError({
        singleInput: 'Project name is required' 
      })
    }
    
    postProject(projectName, newTasks);
  } 
  
  handleRemoteSubmit() {
    const { remoteSubmit } = this.props;
    console.log('hellola')
    remoteSubmit('ADD_PROJECT');
  }  
  
  render() {
    return(
      <div>
        <ProjectTaskForm 
          handleNewProjectSubmit={this.handleNewProjectSubmit.bind(this)}
          isDefaultTaskSubmitDisabled={true}
          handleRemoteSubmit={this.handleRemoteSubmit.bind(this)}
        >
          <SingleInputForm
            formName={"projectName"}
            placeholder={"Project Name"}
            shouldRenderSubmitButton={false}
          />
        </ProjectTaskForm>  
      </div>
      );
    }
  }
  
  const mapStateToProps = state => {
    const { projects, customForm } = state;
    const { tasks: newTasks } = customForm.taskForm;
        
    return {
      queuedProject: projects.queue,
      newTasks
    }
  }

export default AddProjectPage = connect(mapStateToProps, { postProject, remoteSubmit })(AddProjectPage);

AddProjectPage.propTypes = {
  queuedProject: PropTypes.string
}