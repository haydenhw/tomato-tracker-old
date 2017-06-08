import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List from '../components/List';
import Project from '../components/Project';

export default class ProjectsPage extends Component {
  static defaultProps = {
    projects: []
  }
  
  renderProject (project){
    return <Project className="project" key={shortid.generate()} taskData={task} />
  } 
  
  render() {
    return (
      <div className='project-page-container'>
        <button>Add Project</button>
        <List className="project-list" items={this.props.projects} renderItem={this.renderProject}/>
      </div>
    )
  }
}

ProjectsPage.propTypes = {
  projects: PropTypes.array.isRequired
}