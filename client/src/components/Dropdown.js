import React from 'react';
import PropTypes from 'prop-types';

export default function DropdownMenu(props) {
  const { className, children } = props;

  return (
    <div className={`dropdown ${className || ''}`}>
      {children}
    </div>
  );
}

DropdownMenu.propTypes = {
  className: PropTypes.string,
};
