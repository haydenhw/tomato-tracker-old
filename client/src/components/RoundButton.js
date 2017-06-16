import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

export default function RoundButton(props) {
  const { clickHandler, icon } = props;
  return (
    <div
      className={'round-button'}
      onClick={clickHandler}
      role="button"
    >

      <div className="round-button-icon"><i className="icon icon-plus"></i></div>
      <div className="round-button-circle" />
    </div>
  );
}

RoundButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  icon: PropTypes.object.isRequired,
};
