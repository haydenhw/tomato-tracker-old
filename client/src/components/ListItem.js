import React from 'react';
import PropTypes from 'prop-types';


export default function ListItem(props) {
  const { col1Text, col2Text, handleClick, isActive, isSelected  } = props;
  
  return(
    <div className={`list-item ${isActive ? 'active' : ''} ${isSelected ? 'selected' : ''}`} onClick={handleClick}>
      <div className="list-item-col1 list-col">
        <span>{col1Text}</span>
      </div>
      <div className="list-item-col2 list-col">
        <span>{col2Text}</span>
      </div>
      <div className="list-item-col3 list-col">
          {props.children}
      </div>
    </div>
  );
}

ListItem.propTypes = {
  col1Text: PropTypes.string,
  col2Text: PropTypes.string
}