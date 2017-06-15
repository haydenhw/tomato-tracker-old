import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import shortid from 'shortid';

import { secondsToHMMSS } from '../helpers/time'

//import ProjectForm from '../components/ProjectForm';
import List from '../components/List';
import ListHeader from '../components/ListHeader';
import ListItem from '../components/ListItem';


class ProjectsPage extends Component {
  static defaultProps = {
    projects: []
  }
  
  renderProject (project){
    const { projectName } = project;
    const totalTime = 
      project.tasks.length 
        ? project.tasks.map(task => task.recordedTime).reduce((a,b) => a + b)
        : 0;
      
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
    const { projects } = this.props;
    console.log(projects);
    return (
      <div className='project-page-container'>
        <List className="project-list" items={projects} renderItem={this.renderProject}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { projects } = state;
  
  return {
    projects
  }
}

export default connect(mapStateToProps, null)(ProjectsPage);

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