import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { addTask, deleteTask, setSelectedProject, remoteSubmit, updateProject, updateTasks } from '../actions/indexActions';

import { hasAnyValue } from '../helpers/validate';
import { routeToProjects } from '../helpers/route'

import EditProjectNameForm from '../components/EditProjectNameForm';
import ProjectTaskForm from './ProjectTaskForm';

class EditProjectPage extends Component {
  // constructor() {
  //   super()
  //   
  // }
  
  static defaultProps = {
    projects: []
  }
  
  componentDidMount() {
    const { params, setSelectedProject } = this.props;
    const { projectId } = params;
    
    setSelectedProject(projectId);
  }
  
  handleEditProjectName = (project, updateProject) => ({ projectName }) => { 
    const { updateProject } = this.props;
      
      if (!hasAnyValue(projectName)) {
        throw new SubmissionError({
          projectName: 'Project name is required' 
        })
      }
      
    updateProject(project, projectName);  
  }
    
  handleNewChangesSubmit() {
    this.handleEditProjectName();
    this.handleTasksSubmit();
  }  
  
  handleRemoteSubmitTasksForm() {
    const { remoteSubmit } = this.props;
    
    remoteSubmit('ADD_TASKS');  
  }  
    
  handleTasksSubmit({ tasks }) {
    const { updateTasks, selectedProjectId } = this.props;
    updateTasks(selectedProjectId, tasks);
  }
  
  render() {
    const { selectedProject, params } = this.props;
    const { projectId } = params;
    
    return (
      <div className="fullscreen-form form-page">
        <h2>Edit Project <span>{selectedProject.projectName}</span></h2>
        <ProjectTaskForm 
          handleSubmit={this.handleRemoteSubmitTasksForm.bind(this)}
          handleCancel={routeToProjects}
          showTasksForSelectedProject={true}
        >
          <EditProjectNameForm 
            project={selectedProject}
            handleEditProjectSubmit={this.handleEditProjectName.bind(this)}
          />
        </ProjectTaskForm>
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
      projects,
      selectedProjectId,
      selectedProject: { projectName: 'tester' }, 
    }
}

EditProjectPage.propTypes = {
  projects: PropTypes.object
}

export default connect(mapStateToProps, { 
  addTask,
  deleteTask,
  remoteSubmit,
  setSelectedProject,
  updateProject,
  updateTasks
})(EditProjectPage);  
