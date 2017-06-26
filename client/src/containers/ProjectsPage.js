import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import shortid from 'shortid';

import { secondsToHMMSS } from '../helpers/time';
import { addProject, deleteProject, setActiveProject, updateProject } from '../actions/projectActions';
//import ProjectForm from '../components/ProjectForm';
import List from '../components/List';
import ListHeader from '../components/ListHeader';
import ListItem from '../components/ListItem';
import TotalTime from '../components/TotalTime';

class ProjectsPage extends Component {
  static defaultProps = {
    projects: []
  }
  
  handleAddProject() {
    const { addProject } = this.props;
    console.log(addProject)
  
  }
  
  handleListItemClick = (projectId) => () => {
    const { setActiveProject } = this.props;
    
    setActiveProject(projectId);
    hashHistory.push(`/`);
  }  
  
  handleEditOptionClick = (project) => (evt) => {
    evt.stopPropagation()
    hashHistory.push(`/projects/${project.shortId}`)
  }
  
  handleDeleteOptionClick = (project) => () => deleteProject(project);
  
  renderProject (project){
    const { deleteProject } = this.props;
    const { projectName, shortId } = project;
    const totalTime = 
      project.tasks.length 
        ? project.tasks.map(task => task.recordedTime).reduce((a,b) => a + b)
        : 0;
      
    
    return (
      <ListItem 
        className="project"
        key={shortid.generate()}
        col1Text={projectName}
        col2Text={secondsToHMMSS(Math.round(totalTime))}
        handleClick={this.handleListItemClick(shortId)}
      >
        <li className="dropdown-item" onClick={this.handleEditOptionClick(project)}><a>Edit</a></li>
        <li className="dropdown-item" onClick={this.handleDeleteOptionClick(project)}><a>Delete</a></li>
      </ListItem>
    );
  } 
  
  getTotalTime() {
    const { projects } = this.props;
    
    if(!projects.length) {
      return 0; 
    }
    
    return projects.map(project => {
      if (!project.tasks.length) {
        return 0;
      }
          
      return project.tasks.map(task => Number(task.recordedTime)).reduce((a,b) => a + b);
    })
    .reduce((a,b) => a + b);
  }
  
  render() {
    const { projects } = this.props;
    const totalTime = this.getTotalTime();
    
    return (
      <div className='project-page-container'>
        <div className="list-container">
          <ListHeader col1Title="Project" col2Title="Logged Time" />
          <List className="project-list" items={projects} renderItem={this.renderProject.bind(this)}/>
          <TotalTime time={secondsToHMMSS(totalTime)} />
        </div>
        <button onClick={this.handleAddProject.bind(this)}></button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { projects } = state; 
  
  return {
    projects
  }
}

export default connect(mapStateToProps, { 
  addProject,
  deleteProject,
  setActiveProject,
  updateProject
})(ProjectsPage);

ProjectsPage.propTypes = {
  projects: PropTypes.array.isRequired
}