import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { toggleModal } from '../actions/indexActions';

import RootModal from '../components/ModalRoot';
import AddProjectModal from './AddProjectModal';
import AddTasksModal from './AddTasksModal';
import EditTaskModal from './EditTaskModal';
import ProjectNagModal from './ProjectNagModal';
import WelcomeModalContainer from './WelcomeModalContainer';

function Modal(props) {
  const MODAL_COMPONENTS = {
    ADD_PROJECT: AddProjectModal,
    ADD_TASKS: AddTasksModal,
    EDIT_TASK: EditTaskModal,
    PROJECT_NAG: ProjectNagModal,
    WELCOME: WelcomeModalContainer
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
        <span className="modal-close" onClick={toggleModal} role="button">&times;</span>
           <SpecificModal {...modalProps} />   
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
