import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { submit, SubmissionError } from 'redux-form';

import validate, { hasAnyValue } from '../helpers/validate';
import { postProject } from '../actions/indexActions';

import AddProjectForm from '../components/AddProjectForm';
import ProjectTaskForm from './ProjectTaskForm';

let AddProjectPage = class extends Component {
  handleComponentUpdate(prevProps) {
    if (prevProps.queuedProject !== this.props.queuedProject) {
      const { postProject, queuedProject } = this.props;
      const { newTasks } = this.state;
      
      postProject(queuedProject, newTasks);
      hashHistory.push('/projects')
    }
  }
  
  handleAddProject({ projectName }) {
    const { queueNewProject } = this.props;
    
    if (!hasAnyValue(projectName)) {
      throw new SubmissionError({
        projectName: 'Project name is required' 
      })
    }
    
    queueNewProject(projectName);
  };
    
  render() {
    const { postProject, queuedProject } = this.props; 
    
    return(
      <div>
        <ProjectTaskForm 
          handleComponentUpdate={this.handleComponentUpdate}
          handleProjectSubmit={this.handleAddProject.bind(this)}
          isDefaultTaskSubmitDisabled={true}
          postProject={postProject}
          queuedProject={queuedProject}
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

  export default AddProjectPage = connect(mapStateToProps, {
    postProject,
    submit
  })(AddProjectPage);
  
  
  AddProjectPage.propTypes = {
    queuedProject: PropTypes.string
  }