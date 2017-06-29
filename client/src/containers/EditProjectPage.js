import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';

import { addTask, deleteTask, editProjectName, setSelectedProject } from '../actions/indexActions';

import ProjectForm from '../components/ProjectForm';

class EditProjectPage extends Component {
  constructor() {
    super()
    
    this.addNewTask = this.addNewTask.bind(this);
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
    console.log(props)
    const { editProjectName } = props;
    
    console.log(editProjectName);
    editProjectName(projectName);
  }
  
  addNewTask (values) {
    console.log('hello')
    this.props.addTask('123', 'new task');
  }
  
  deleteTask (taskId) {
    this.props.deleteTask('123', '111');
  }
  
  renderFormTask (task) {
    const { taskName } = task;
    
    return (
      <div className="form-task-list-item" key={shortid.generate()}>
        <span>{taskName}</span>
        <div className="button-wrapper">
          <button onClick={this.deleteTask.bind(this)}>&times;</button>
        </div>
      </div>
    );
  }
  
  render() {
    const { selectedProject, editProjectName, params } = this.props;
    const { projectId } = params;
    
    return (
      <ProjectForm 
        project={selectedProject}
        projectId={projectId}
        editProjectName={editProjectName}
        handleEditProjectSubmit={this.editProjectName}
        renderFormTask={this.renderFormTask.bind(this)}
      />
    );
  }
  
  }
  const mapStateToProps = (state) => {
    const { selectedProjectId, projects } = state;
    
    const selectedProject = state.projects.length && selectedProjectId 
    ? projects.find((project) => project.shortId === selectedProjectId).projectName
    : 'No Projects Loaded'
    
    return {
      selectedProject, 
      projects
    }
}

EditProjectPage.propTypes = {
  projects: PropTypes.array
}

export default connect(mapStateToProps, { 
  addTask,
  deleteTask,
  editProjectName, 
  setSelectedProject,
})(EditProjectPage);  
