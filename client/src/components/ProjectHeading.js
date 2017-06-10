import React from 'react';
import PropTypes from 'prop-types';

export default function ProjectHeading(props) {
  const { text, handleClick } = props;
  
  return (
    <div className="project-heading-wrapper" onClick={handleClick}>
      <h2 className="project-heading">{text}</h2>
      <img  className="project-heading-icon" src="images/dots-menu.svg" alt="dots-menu"/>
    </div>
  );
}

ProjectHeading.propTypes = {
  handleClick: PropTypes.string,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
