import React from 'react';

export default function List(props) {
  const { items, renderItem } = props;
  
  const list = items.map(renderItem);
  
  return(
    <div>
      {list}
    </div>
  );
}