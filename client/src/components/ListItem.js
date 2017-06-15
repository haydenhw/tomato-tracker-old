import React from 'react';
import PropTypes from 'prop-types';

import EditMenu from '../containers/EditMenu';

export default function ListItem(props) {
  const { col1Text, col2Text } = props;

  return(
    <div className="list-item">
      <div className="list-item-col1 list-col">
        <span>{col1Text}</span>
      </div>
      <div className="list-item-col2 list-col">
        <span>{col2Text}</span>
      </div>
      <div className="list-item-col3 list-col">
        <EditMenu className='list-item-edit-menu'>
          {props.children}
        </EditMenu>
      </div>
    </div>
  );
}

ListItem.propTypes = {
  col1Text: PropTypes.string,
  col2Text: PropTypes.string
}