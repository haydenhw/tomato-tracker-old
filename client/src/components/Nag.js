import React from 'react';
import PropTypes from 'prop-types';

export default function Nag({ actionButtonText, nagMessage, onActionButtonClick }) {
  return (
      <div className="nag">
        <span className="nag-message">{nagMessage}</span>
        <div className="nag-button-wrapper">
          <button className="nag-add-button material-button" onClick={onActionButtonClick}>{actionButtonText}</button>
        </div>
      </div>
  );
}

Nag.propTypes = {
}
