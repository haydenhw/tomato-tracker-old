import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProjectsPage extends Component {
  render() {
    return (
      <div>
        <button>Add Project</button>
        <ProjectsList projects={this.props.projects}/>
      </div>
    )
  }
}