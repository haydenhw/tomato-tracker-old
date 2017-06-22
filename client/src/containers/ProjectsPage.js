import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import shortid from 'shortid';

import { secondsToHMMSS } from '../helpers/time';
import { deleteProject, setActiveProject } from '../actions/projectActions';
//import ProjectForm from '../components/ProjectForm';
import List from '../components/List';
import ListHeader from '../components/ListHeader';
import ListItem from '../components/ListItem';
import TotalTime from '../components/TotalTime';

class ProjectsPage extends Component {
  static defaultProps = {
    projects: []
  }
  handleListItemClick = (projectId) => () => {
    const { setActiveProject } = this.props;
    
    setActiveProject(projectId);
    hashHistory.push(`/`);
  }  
  renderProject (project){
    const { deleteProject } = this.props;
    const { projectName, shortId } = project;
    const totalTime = 
      project.tasks.length 
        ? project.tasks.map(task => task.recordedTime).reduce((a,b) => a + b)
        : 0;
      
    const handleEdit = () => () => hashHistory.push(`/projects/${project.shortId}`);
    const handleDelete = (project) => () => deleteProject(project);
    
    return (
      <ListItem 
        className="project"
        key={shortid.generate()}
        col1Text={projectName}
        col2Text={secondsToHMMSS(Math.round(totalTime))}
        handleClick={this.handleListItemClick(shortId)}
      >
        <li className="dropdown-item" onClick={handleEdit()}><a>Edit</a></li>
        <li className="dropdown-item" onClick={handleDelete(project)}><a>Delete</a></li>
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

export default connect(mapStateToProps, { deleteProject, setActiveProject })(ProjectsPage);

ProjectsPage.propTypes = {
  projects: PropTypes.array.isRequired
}