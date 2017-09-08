import React from 'react';
import PropTypes from 'prop-types';

export default function PopupMenuTrigger(props) {
  const { children, handleClick } = props;

  return (
    <div className="popup-menu-trigger-wrapper">
      <div className="popup-menu-trigger" onClick={handleClick}>
        {children}
      </div>
    </div>
  );
}

PopupMenuTrigger.propTypes = {
  shouldRender: PropTypes.bool,
};
