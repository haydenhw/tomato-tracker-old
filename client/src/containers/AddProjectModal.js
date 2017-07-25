import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import { changeModalType, postProject } from '../actions/indexActions';
import { hasAnyValue, isDuplicate } from '../helpers/validate';

import FormModal from '../components/FormModal';
import SingleInputForm from '../components/SingleInputForm';

class AddProjectModal extends Component {
  handleAddProject({ singleInput: projectName }) {
    const { changeModalType, postProject, projects } = this.props;
    
    const projectNames = projects.map((project) => project.projectName);
    
    if (!hasAnyValue(projectName)) {
      throw new SubmissionError({
        singleInput: 'Project name is required' 
      })
    }    
    
    if (isDuplicate(projectName, projectNames)) {
      throw new SubmissionError({
        singleInput: `A project with the name '${projectName}' already exists`
      })
    }    
    
    // this.toggleIsContentWaiting();
    postProject(projectName);
    changeModalType('ADD_TASKS');
  } 
  
  render () {
    const { title } = this.props;
    
    return (
      <FormModal
        title="Add a project "
      >
        <SingleInputForm
          // className="bounceInDown-appear"
          formName="projectName"
          handleFormSubmit={this.handleAddProject.bind(this)}
          placeholder="Project Name"
          shouldRenderSubmitButton={true}
        />
      </FormModal>
    );
  }
}
const mapStateToProps = state => {
  const { projects } = state;
  
  return {
    projects: projects.items
  }
}

export default connect(mapStateToProps, { changeModalType, postProject })(AddProjectModal);

AddProjectModal.propTypes = {
  
}
