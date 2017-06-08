import React from 'react';
import PropTypes from 'prop-types';

export default function List(props) {
  const { items, className, renderItem } = props;
  
  const list = items.map(renderItem);
  
  return(
    <div className={className || ''} >
      {list}
    </div>
  );
}

List.propTypes = {
  items: PropTypes.array.isRequired,
  wrapperClass: PropTypes.string,
  renderItem: PropTypes.func.isRequired
}