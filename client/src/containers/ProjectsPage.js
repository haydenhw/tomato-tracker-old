import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import shortid from 'shortid';

import { secondsToHMMSS } from '../helpers/time';
import {
  addProject,
  deleteProject,
  setSelectedProject,
  updateProject
} from '../actions/projectActions';

import ProjectNagModal from './ProjectNagModal';
import List from '../components/List';
import ListHeader from '../components/ListHeader';
import ListItem from '../components/ListItem';
import TotalTime from '../components/TotalTime';

class ProjectsPage extends Component {
  static defaultProps = {
    projects: []
  }
  
  handleAddButtonClick() {
    hashHistory.push('/projects/new');
  }
  
  handleListItemClick = (projectId) => () => {
    const { setSelectedProject } = this.props;
    
    setSelectedProject(projectId);
    hashHistory.push(`/`);
  }  
  
  handleEditOptionClick = (project) => (evt) => {
    evt.stopPropagation()
    hashHistory.push(`/projects/${project.shortId}`)
  }
  
  handleDeleteOptionClick = (project) => (evt) => {
    evt.stopPropagation();
    
    const { deleteProject } = this.props;
    deleteProject(project);
  }
  
  renderProject (project){
    const { selectedProjectId } = this.props;
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
        isSelected={selectedProjectId === shortId}
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
        { projects.length
        ? <div>
            <div className="list-container">
                <ListHeader col1Title="Project" col2Title="Logged Time" />
                <List className="project-list" items={projects} renderItem={this.renderProject.bind(this)}/>
                <TotalTime time={secondsToHMMSS(totalTime)} />
              </div>
            <button className="add-button material-button" onClick={this.handleAddButtonClick.bind(this)}>ADD PROJECT</button>
          </div> 
          
        : <div className="list-container">
            <p>No projects exist yet. Create one to get started</p>
            <button className="material-button" onClick={this.handleAddButtonClick.bind(this)}>ADD PROJECT</button>
            <ProjectNagModal />
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { projects, selectedProjectId } = state; 
  
  return {
    projects: projects.items,
    selectedProjectId
  }
}

export default connect(mapStateToProps, { 
  addProject,
  deleteProject,
  setSelectedProject,
  updateProject
})(ProjectsPage);

ProjectsPage.propTypes = {
  projects: PropTypes.array.isRequired
}