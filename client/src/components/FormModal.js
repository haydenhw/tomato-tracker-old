import React from 'react';
import PropTypes from 'prop-types';

export default function FormModal(props) {
  const { children, title } = props;
  
  return(
    <div className="form">
      <h2 className="form-title bounceInDown-appear">{title}</h2>
      {children}
    </div>
  );
}

FormModal.propTypes = {
  handleGetStartedClick: PropTypes.func.isRequired
}
