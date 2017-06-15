import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import shortid from 'shortid';

import { secondsToHMMSS } from '../helpers/time'

import EditMenu from './EditMenu'
import ProjectForm from '../components/ProjectForm';
import List from '../components/List';
import ListHeader from '../components/ListHeader';
import ListItem from '../components/ListItem';


export default class ProjectsPage extends Component {
  static defaultProps = {
    projects: []
  }
  
  renderProject (project){
    const { projectName } = project;
    const totalTime = project.tasks.map(task => task.recordedTime).reduce((a,b) => a + b);
    const handleMenuClick = () => hashHistory.push(`/projects/${project.shortId}`);
    
    return (
      <ListItem 
        className="project"
        key={shortid.generate()}
        col1Text={projectName}
        col2Text={secondsToHMMSS(Math.round(totalTime))}
      >
        <li className="dropdown-item" onClick={handleMenuClick}><a>Edit</a></li>
        <li className="dropdown-item"><a>Delete</a></li>
      </ListItem>
    );
  } 
  
  render() {
    return (
      <div className='project-page-container'>
        <List className="project-list" items={getProjects()} renderItem={this.renderProject}/>
      </div>
    )
  }
}

ProjectsPage.propTypes = {
  projects: PropTypes.array.isRequired
}

function getProjects() {
  return ([
    {
      projectName: "Node Capstone",
      shortId: shortid.generate(),
      tasks: [
        {
          taskName: 'user flows',
          recordedTime: Math.random() * 100,
          id: shortid.generate()
        },
        {
          taskName: 'mock up',
          recordedTime: Math.random() * 100,
          id: shortid.generate()
        },
        {
          taskName: 'mvp',
          recordedTime: Math.random() * 100,
          id: shortid.generate()
        },
      ]
    },
    {
      projectName: "React Capstone",
      shortId: shortid.generate(),
      tasks: [
        {
          taskName: 'user flows',
          recordedTime: Math.random() * 100,
          id: shortid.generate()
        },
        {
          taskName: 'mock up',
          recordedTime: Math.random() * 100,
          id: shortid.generate()
        },
        {
          taskName: 'mvp',
          recordedTime: Math.random() * 100,
          id: shortid.generate()
        },
      ]
    },
  ])
}