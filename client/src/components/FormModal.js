import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Text } from 'react-form';
import Modal from './Modal';

export default class FormModal extends Component {
  
  render() {
    const { hanldeFormSubmit, handleCloseButtonClick, shouldRenderModal } = this.props;
    return (
      <Modal 
        handleCloseButtonClick={handleCloseButtonClick}
        shouldRender={shouldRenderModal}
        style={{width: "300px"}}
        text={"Add a new project"}
        >
          <Form
            onSubmit={(values) => {
              hanldeFormSubmit(values)
            }}
            validate={({ name }) => {
              return {
                name: !name ? 'A name is required' : undefined
              }
            }}
          >
            {({submitForm}) => {
              return (
                <form onSubmit={submitForm}>
                  <Text field='name' />
                  <button type='submit'>Submit</button>
                </form>
              )
            }}
          </Form>
        </Modal> 
      );
    }
  }
    
FormModal.propTypes = {
  hanldeFormSubmit: PropTypes.func,
  handleCloseButtonClick: PropTypes.func.isRequired,
  shouldRenderModal: PropTypes.bool.isRequired
}