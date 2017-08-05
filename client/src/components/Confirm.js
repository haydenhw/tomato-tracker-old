import React from 'react';
import PropTypes from 'prop-types';

export default function Confirm({ onCancel, onDangerClick, onDangerText, title }) {

  return(
    <div className="confirm-modal">
      {title}
      <p className="danger-text">{onDangerText}</p>
      <div className="confirm-button-group">
        <button className="form-submit cancel" onClick={onCancel}>Cancel</button>
        <button className="form-submit confirm" onClick={onDangerClick}>Confirm</button>
      </div>
    </div>
  );
}

Confirm.propTypes = {
}
