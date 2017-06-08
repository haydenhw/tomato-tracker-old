import React from 'react';
import PropTypes from 'prop-types';

export default function Project(props) {
  const { projectData, totalTime } = props;
  const { projectName } = projectData;
  
  return(
    <div className="list-item">
      <span>{projectName}</span>
      <span>{totalTime}</span>
    </div>
  );
}

Project.propTypes = {
  projectData: PropTypes.object.isRequired
}