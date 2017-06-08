import React from 'react';
import PropTypes from 'prop-types';

export default function Project(props) {
  const { projectData } = props;
  const { projectName } = projectData;
  
  return(
    <div className="project">
      <span>{projectName}</span>
      <span>{recordedTime}</span>
    </div>
  );
}

Project.propTypes = {
  projectData: PropTypes.object.isRequired
}