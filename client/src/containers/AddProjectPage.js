import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import { postProject, remoteSubmit } from '../actions/indexActions';
import { hasAnyValue } from '../helpers/validate';
import { routeToProjects } from '../helpers/route';

import ProjectTaskForm from './ProjectTaskForm';
import RemoteSubmitForm from './RemoteSubmitForm';
import SingleInputForm from '../components/SingleInputForm';

let AddProjectPage = class extends Component {
  handleNewProjectSubmit({ singleInput: projectName }) {
    const { newTasks, postProject, remoteSubmit } = this.props;
    
    if (!hasAnyValue(projectName)) {
      remoteSubmit(null);
      
      throw new SubmissionError({
        singleInput: 'Project name is required' 
      })
    }
    
    postProject(projectName, newTasks);
  } 
  
  handleRemoteSubmit() {
    const { remoteSubmit } = this.props;
    
    remoteSubmit('ADD_PROJECT');
  }  
  
  render() {
    return(
      <div className="fullscreen-form form-page">
        <h2>New Project</h2>
        <ProjectTaskForm 
          handleSubmit={this.handleRemoteSubmit.bind(this)}
          handleCancel={routeToProjects}
          label="Project Name"
        >  
          <RemoteSubmitForm
            onTargetUpdate={this.handleNewProjectSubmit.bind(this)}
            targetValue="ADD_PROJECT" 
            targetPropKey="remoteSubmitForm"
          >
            <SingleInputForm
              formName={"projectName"}
              placeholder={"Project Name"}
              shouldRenderSubmitButton={false}
            />
          </RemoteSubmitForm>         
        </ProjectTaskForm>  
      </div>
    );
  }
}
  
  const mapStateToProps = state => {
    const { customForm } = state;
    const { tasks: newTasks } = customForm.taskForm;
        
    return {
      newTasks
    }
  }

export default AddProjectPage = connect(mapStateToProps, { postProject, remoteSubmit })(AddProjectPage);

AddProjectPage.propTypes = {
  queuedProject: PropTypes.string
}