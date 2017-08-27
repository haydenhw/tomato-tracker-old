import React from 'react';
import PropTypes from 'prop-types';

export default function ListItemColumn({ children, colNumber }) {
  return(
    <div className={`list-item-col${colNumber} list-item-col`}>
      {children}
    </div>
  );
}

ListItemColumn.propTypes = {
}