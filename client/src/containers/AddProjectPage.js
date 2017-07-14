import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { postProject } from '../actions/indexActions';

import SingleInputForm from '../components/SingleInputForm';
import ProjectTaskForm from './ProjectTaskForm';

let AddProjectPage = class extends Component {
  handleNewProjectSubmit({ projectName }) {
    const { newTasks, postProject } = this.props;
    
    postProject(projectName, newTasks);
  } 
  
  render() {
    return(
      <div>
        <ProjectTaskForm 
          formSelector={"ADD_PROJECT"}
          handleNewProjectSubmit={this.handleNewProjectSubmit.bind(this)}
          isDefaultTaskSubmitDisabled={true}
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

  export default AddProjectPage = connect(mapStateToProps, { postProject })(AddProjectPage);
  
  AddProjectPage.propTypes = {
    queuedProject: PropTypes.string
  }