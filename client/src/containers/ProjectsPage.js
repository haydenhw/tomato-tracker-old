import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hashHistory } from 'react-router';
import shortid from 'shortid';

import EditMenu from './EditMenu'
import ProjectForm from '../components/ProjectForm';
import List from '../components/List';
import Project from '../components/Project';

export default class ProjectsPage extends Component {
  static defaultProps = {
    projects: []
  }
  
  renderProject (project){
    const totalTime = project.tasks.map(task => task.recordedTime).reduce((a,b) => a + b);
    const handleMenuClick = () => hashHistory.push(`/projects/${project.shortId}`);
    
    return (
      <Project 
        className="project"
        handleMenuClick={handleMenuClick}
        key={shortid.generate()}
        projectData={project}
        totalTime={Math.round(totalTime)}
      />
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