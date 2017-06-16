import React from 'react';
import PropTypes from 'prop-types';

export default function ProjectHeading(props) {
  const { text, iconClass, handleClick } = props;
  
  return (
    <div className="project-heading-wrapper" onClick={handleClick}>
      <h2 className="project-heading">{text}</h2>
      <i className={iconClass}></i>
    </div>
  );
}

ProjectHeading.propTypes = {
  handleClick: PropTypes.string,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
