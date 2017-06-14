import React from 'react';
import PropTypes from 'prop-types';

export default function ListHeader(props) {
   const {col1Title, col2Title } = props;
  
  return(
    <div className="list-item list-item-header">
      <div className="list-item-col1 list-col">
        <span>{col1Title}</span>
      </div>
      <div className="list-item-col2 list-col">
        <span>{col2Title}</span>
      </div>
      <div className="list-item-col3 list-col"></div>
    </div>
  );
}

ListHeader.propTypes = {
  col1Title: PropTypes.string,
  col2Title: PropTypes.string,
}