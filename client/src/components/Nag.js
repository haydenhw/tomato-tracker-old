import React from 'react';
import PropTypes from 'prop-types';

export default function Nag({ onCancel, onAccept, nagMessage, title }) {

  return(
    <div className="confirm-modal">
      {title}
      <p className="danger-text">{nagMessage}</p>
      <button className="material-button" onClick={onAccept}>ADD PROJECT</button>
    </div>
  );
}

Nag.propTypes = {
}
