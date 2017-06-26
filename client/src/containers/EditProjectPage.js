import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';

import { addTask, deleteTask, editProjectName, setActiveProject } from '../actions/indexActions';

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
    const { params, setActiveProject } = this.props;
    const { projectId } = params;
    
    setActiveProject(projectId);
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
    const { activeProject, editProjectName, params } = this.props;
    const { projectId } = params;
    
    return (
      <ProjectForm 
        project={activeProject}
        projectId={projectId}
        editProjectName={editProjectName}
        handleEditProjectSubmit={this.editProjectName}
        renderFormTask={this.renderFormTask.bind(this)}
      />
    );
  }
  
  }
  const mapStateToProps = (state) => {
    const { activeProjectId, projects } = state;
    
    const activeProject = state.projects.length && activeProjectId 
    ? projects.find((project) => project.shortId === activeProjectId).projectName
    : 'No Projects Loaded'
    
    return {
      activeProject, 
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
  setActiveProject,
})(EditProjectPage);  
