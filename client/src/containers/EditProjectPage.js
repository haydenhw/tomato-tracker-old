import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';

import { addTask, deleteTask, editProjectName, setSelectedProject, updateTasks } from '../actions/indexActions';

import EditProjectNameForm from '../components/EditProjectNameForm';
import ProjectTaskForm from './ProjectTaskForm';

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
  
  
  handleEditProjectName (props, { projectName }) { 
    const { editProjectName } = props;
    
    editProjectName(projectName);
  }
  
  handleTasksSubmit({ tasks }) {
    const { updateTasks, selectedProjectId } = this.props;
    console.log(tasks)
  //  updateTasks(selectedProjectId, tasks);
  }
  
  render() {
    const { selectedProject, editProjectName, params } = this.props;
    const { projectId } = params;
    
    return (
    <div className="fullscreen-form form-page">
      <h2>Edit Project <span>{selectedProject.projectName}</span></h2>
      <ProjectTaskForm >
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
  editProjectName, 
  setSelectedProject,
  updateTasks
})(EditProjectPage);  
