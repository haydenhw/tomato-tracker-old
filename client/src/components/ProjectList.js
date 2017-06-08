import React from 'react';
import PropTypes from 'prop-types';
import List from './List';
import Project from './Project';

export default function ProjectList(props) {
  const { projects } = props;

  const renderProject = project => (
    <Task className="project" key={shortid.generate()} projectData={project} />
  ); 
  
  return(
    <div className="project-list">
      <List items={projects} renderItem={renderTask} />
    </div>
  );
}