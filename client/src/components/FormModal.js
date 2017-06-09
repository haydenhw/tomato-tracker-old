import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Text } from 'react-form';

import Modal from './Modal';
import { Field, reduxForm } from 'redux-form';
import AddProjectForm from './AddProjectForm';

export default class FormModal extends Component {
  
  renderForm() {
    if () {
      return <AddProjectForm handleProjectSubmit={(values) => console.log(values)} />
    }
  }
  
  render() {
    const { hanldeFormSubmit, handleCloseButtonClick, shouldRenderModal } = this.props;
    return (
      <Modal 
        handleCloseButtonClick={handleCloseButtonClick}
        shouldRender={shouldRenderModal}
        style={{width: "300px"}}
        text={"Add a new project"}
        >
          {this.renderForm()}
        </Modal> 
      );
    }
  }
    
FormModal.propTypes = {
  hanldeFormSubmit: PropTypes.func,
  handleCloseButtonClick: PropTypes.func.isRequired,
  shouldRenderModal: PropTypes.bool.isRequired
}