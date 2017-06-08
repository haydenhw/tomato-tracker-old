import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import ProjectForm from '../components/ProjectForm';

export default class ProjectFormPage extends Component {
  render() {
    const { params } = this.props;
    const { projectId } = params;
    
    const data = getProjects();
    const activeProject = data.find(project => project.shortId = projectId);
    
    console.log(activeProject);
    
    return (
      <ProjectForm project={activeProject} />
    );
  }
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