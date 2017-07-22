import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { toggleModal } from '../actions/indexActions';

import RootModal from '../components/ModalRoot';
import ProjectNagModal from './ProjectNagModal';

function Modal(props) {
  const MODAL_COMPONENTS = {
    PROJECT_NAG: ProjectNagModal
  }
  
  const {
    areChildrenActive,   
    children, 
    handleCloseButtonClick,
    isModalActive, 
    modalClass,
    modalProps,
    modalType, 
    rootModalClass,
    style,
    toggleModal
  } = props;
  
  if (!isModalActive) {
    return null;
  }
  
  const SpecificModal = MODAL_COMPONENTS[modalType];
  
  return (
    <RootModal className={rootModalClass}>
      <div className={`modal ${modalClass}`} style={style}>
        <span className="modal-close" onClick={handleCloseButtonClick} role="button">&times;</span>
        {areChildrenActive === true
          ? children
          : <SpecificModal {...modalProps} />   
        }
      </div>
    </RootModal>
  );  
}

const mapStateToProps = state => {
  const { modal } = state;
  const { isModalActive, modalProps, modalType  } = modal;
  
  return {
    isModalActive,
    modalProps,
    modalType
  }
}

export default connect(mapStateToProps, { toggleModal })(Modal)

Modal.propTypes = {
  
};
