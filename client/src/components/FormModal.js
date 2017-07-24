import React from 'react';
import PropTypes from 'prop-types';

export default function FormModal(props) {
  const { children, greyText, title } = props;
  
  return(
    <div className="form">
      <h2 className="form-title bounceInDown">
      {title}
      <span className='grey-title-name'>{greyText}</span>
     </h2>
      <div className="bounceInDown-second">
        {children}
      </div>
    </div>
  );
}

FormModal.propTypes = {
  // handleGetStartedClick: PropTypes.func.isRequired
}
