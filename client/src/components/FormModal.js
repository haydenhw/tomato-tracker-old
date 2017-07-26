import React from 'react';
import PropTypes from 'prop-types';

export default function FormModal(props) {
  const { children, greyText, title } = props;
  
  return (
      <div>
        {children}
      </div>
  );
}

FormModal.propTypes = {
  // handleGetStartedClick: PropTypes.func.isRequired
}
