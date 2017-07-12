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

import Modal from './Modal';
import EditMenu from './EditMenu';
import List from '../components/List';
import ListHeader from '../components/ListHeader';
import ListItem from '../components/ListItem';
import TotalTime from '../components/TotalTime';

class ProjectsPage extends Component {
  constructor(){
    super();
    
    this.state = {
      isProjectSelectTipActive: true
    }
  }
  
  static defaultProps = {
    projects: ['filler']
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
  
  toggleProjectSelectTip() {
    this.setState({ isProjectSelectTipActive: false });
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
        <EditMenu className='list-item-edit-menu'>
          <li className="dropdown-item" onClick={this.handleEditOptionClick(project)}><a>Edit</a></li>
          <li className="dropdown-item" onClick={this.handleDeleteOptionClick(project)}><a>Delete</a></li>
        </EditMenu>  
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
    const { hasFetched, projects } = this.props;
    const { isProjectSelectTipActive } = this.state;
    const totalTime = this.getTotalTime();
    
    if (!hasFetched){
      return <div> Loading...</div>
    }
    
    return (
      <div className='projects-page-container'>
        { (isProjectSelectTipActive && projects.length > 1) && 
          <div className="project-select-tip-wrapper">
            <div className="project-select-tip">
              <span>To track time for a different project, simply select it from the list below.</span>
              <button onClick={this.toggleProjectSelectTip.bind(this)}>&times;</button>
            </div>
          </div>  
        }
        { projects.length 
          ? <div>
              <div className="list-container">
                <div className="add-button-wrapper">
                  <button className="add-button material-button" onClick={this.handleAddButtonClick.bind(this)}>NEW PROJECT</button>
                </div>                
                <ListHeader col1Title="Project" col2Title="Logged Time" />
                <List className="project-list" items={projects} renderItem={this.renderProject.bind(this)}/>
                <TotalTime time={secondsToHMMSS(totalTime)} />
              </div>
            </div> 
          : <div className="list-container">
              <span>No projects exist yet. Create one to get started</span>
              <button className="add-button material-button" onClick={this.handleAddButtonClick.bind(this)}>ADD PROJECT</button>
              <Modal rootModalClass="roadrunner" />  
            </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { projects, selectedProjectId } = state; 
  const { hasFetched } = projects;
  
  return {
    hasFetched, 
    selectedProjectId,
    projects: projects.items,
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