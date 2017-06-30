import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';

import { addTask, deleteTask, editProjectName, setSelectedProject } from '../actions/indexActions';

import EditProjectForm from '../components/EditProjectForm';
import AddTasksFormContainer from './AddTasksFormContainer'; 

class EditProjectPage extends Component {
  constructor() {
    super()
    
  }
  
  static defaultProps = {
    projects: []
  }
  
  componentDidMount() {
    const { params, setSelectedProject } = this.props;
    const { projectId } = params;
    
    setSelectedProject(projectId);
  }
  
  editProjectName (props, { projectName }) { 
    const { editProjectName } = props;
    
    editProjectName(projectName);
  }
  
  render() {
    const { selectedProject, editProjectName, params } = this.props;
    const { projectId } = params;
    
    return (
    <div className="fullscreen-form form-page">
      <h2>Edit Project <span>{selectedProject.projectName}</span></h2>
      <EditProjectForm 
        project={selectedProject}
        projectId={projectId}
        editProjectName={editProjectName}
        handleEditProjectSubmit={this.editProjectName}
      />
      <AddTasksFormContainer /> 
    </div>  
    );
  }
  
  }
  const mapStateToProps = (state) => {
    const { selectedProjectId, projects } = state;
    
    const selectedProject = state.projects.length && selectedProjectId 
    ? projects.items.find((project) => project.shortId === selectedProjectId).projectName
    : 'No Projects Loaded'
    
    return {
      selectedProject: {projectName: 'tester'}, 
      projects
    }
}

EditProjectPage.propTypes = {
  projects: PropTypes.object
}

export default connect(mapStateToProps, { 
  addTask,
  deleteTask,
  editProjectName, 
  setSelectedProject,
})(EditProjectPage);  
