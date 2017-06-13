import React from 'react';
import PropTypes from 'prop-types';

export default function ListHeader(props) {
   const {col1Title, col2Title } = props;
  
  return(
    <div className="list-item">
      <span>{col1Title}</span>
      <span>{col2Title}</span>
    </div>
  );
}

ListHeader.propTypes = {
  col1Title: PropTypes.string,
  col2Title: PropTypes.string,
}