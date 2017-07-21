import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import { postProject, remoteSubmit } from '../actions/indexActions';
import { hasAnyValue, isDuplicate } from '../helpers/validate';
import { routeToProjects } from '../helpers/route';

import ProjectTaskForm from './ProjectTaskForm';
import RemoteSubmitForm from './RemoteSubmitForm';
import SingleInputForm from '../components/SingleInputForm';

let AddProjectPage = class extends Component {
  handleNewProjectSubmit({ singleInput: projectName }) {
    const { newTasks, postProject, projectNames, remoteSubmit } = this.props;
    
    if (!hasAnyValue(projectName)) {
      remoteSubmit(null);
      
      throw new SubmissionError({
        singleInput: 'Project name is required' 
      })
    }
    
    if (isDuplicate(projectName, projectNames)) {
      throw new SubmissionError({
        singleInput: `A project with the name '${projectName}' already exists`,
      })
    }    
    
    postProject(projectName, newTasks);
    remoteSubmit(null);
    routeToProjects();
  } 
  
  handleRemoteSubmit() {
    const { remoteSubmit } = this.props;
    
    remoteSubmit('ADD_PROJECT');
  }  
  
  render() {
    const { remoteSubmitForm } = this.props;
    
    return(
      <div className="fullscreen-form form-page">
        <h2>New Project</h2>
        <ProjectTaskForm 
          handleSubmit={this.handleRemoteSubmit.bind(this)}
          handleCancel={routeToProjects}
          label="Project Name"
        >  
            <SingleInputForm
              formName={"projectName"}
              placeholder={"Project Name"}
              remoteSubmitForm={remoteSubmitForm}
              shouldRenderSubmitButton={false}
              onTargetUpdate={this.handleNewProjectSubmit.bind(this)}
              targetValue="ADD_PROJECT" 
              targetPropKey="remoteSubmitForm"
            />
        </ProjectTaskForm>  
      </div>
    );
  }
}
  
  const mapStateToProps = state => {
    const { customForm, projects } = state;
    const { remoteSubmitForm, taskForm } = customForm;
    const { tasks: newTasks} = taskForm;
        
    const projectName = projects.items.map((project) => project.projectName);    
    
    return {
      newTasks
    }
  }

export default AddProjectPage = connect(mapStateToProps, { postProject, remoteSubmit })(AddProjectPage);

AddProjectPage.propTypes = {
  queuedProject: PropTypes.string
}