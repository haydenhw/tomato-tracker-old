import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import RootModal from './ModalRoot';

export default class Modal extends Component {

  componentDidMount() {
    const { handleDidMount } = this.props;

    if (handleDidMount) {
      handleDidMount();
    }
  }

  componentDidUpdate() {
    const { handleDidUpdate } = this.props;

    if (handleDidUpdate) {
      handleDidUpdate();
    }
  }

  renderLeftButton() {
    const { leftButtonText, handleLeftButtonClick } = this.props;

    if (handleLeftButtonClick) {
      return (
        <button
          className="modal-button-left modal-button"
          onClick={handleLeftButtonClick}
        >
          {leftButtonText}
        </button>
      );
    }

    return null;
  }
  
  renderRightButton() {
    const { rightButtonText, handleRightButtonClick } = this.props;

    if (handleRightButtonClick) {
      return (
        <button
          className="modal-button-right modal-button"
          onClick={handleRightButtonClick}
        >
          {rightButtonText}
        </button>
      );
    }

    return null;
  }

  renderImage() {
    const { image } = this.props;

    if (image) {
      const { alt, src } = image;
      return (
        <img
          className={`modal-image ${image.class}`}
          src={src}
          alt={alt}
        />
      );
    }

    return null;
  }

  renderList() {
    const { list1, list2 } = this.props;

    if (list1 && !list2) {
      const items = list1.map(item => <li key={shortid.generate()} >{item}</li>);

      return (
        <div className="list-wrapper">
          <ul>{items}</ul>
        </div>
      );
    }

    if (list1 && list2) {
      const items1 = list1.map(item => <li key={shortid.generate()} >{item}</li>);
      const items2 = list2.map(item => <li key={shortid.generate()} >{item}</li>);

      return (
        <div className="list-wrapper">
          <ul>{items1}</ul>
          <ul>{items2}</ul>
        </div>
      );
    }

    return null;
  }

  render() {
    const {
      children, 
      handleCloseButtonClick,
      handleRightButtonClick,
      modalClass,
      rightButtonClass,
      rightButtonText,
      text,
      style,
      title,
      shouldRender,
    } = this.props;

    const rightButtonClassName = `modal-button ${rightButtonClass}`;
    
    if (!shouldRender) {
      return null;
    }
    
    return (
      <RootModal>
        <div className={`modal-content ${modalClass}`} style={style}>
          <span className="modal-close" onClick={handleCloseButtonClick} role="button">&times;</span>
          <div className="modal-scroll-wrapper">
            <h2 className="modal-title">{title}</h2>
            {this.renderImage()}
            <div className="modal-text-parent">
              <div className="modal-text-child">
                {text.split('\n').map(line => <p key={shortid.generate()}>{line}</p>)}
              </div>
            </div>
            {this.renderList()}
            {children}
          </div>
          <div className="modal-button-wrapper">
            {this.renderLeftButton()}
            {this.renderRightButton()}
              {rightButtonText}
          </div>
        </div>
      </RootModal>
    );
  }
}

Modal.propTypes = {
  handleCloseButtonClick: PropTypes.func.isRequired,
  handleDidMount: PropTypes.func,
  handleDidUpdate: PropTypes.func,
  handleLeftButtonClick: PropTypes.func,
  handleRightButtonClick: PropTypes.func,
  image: PropTypes.object,
  leftButtonText: PropTypes.string,
  list1: PropTypes.array,
  list2: PropTypes.array,
  modalClass: PropTypes.string,
  rightButtonClass: PropTypes.string,
  rightButtonText: PropTypes.string,
  shouldRender: PropTypes.bool.isRequired,
  text: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.object
};
