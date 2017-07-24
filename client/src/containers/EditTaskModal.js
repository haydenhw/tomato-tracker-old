import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { changeModalType } from '../actions/indexActions';

import FormModal from '../components/FormModal';
import EditTaskForm from '../components/EditTaskForm';

export default function EditTaskModal(props) {
  // const { clickedTaskId } = props;
  
  return (
    <FormModal 
      title={"Edit task"}
      // greyText={clickedTaskId}
    >
      <EditTaskForm />
    </FormModal>
  );
}
// 
// const mapStateToProps = state => {
//   const { clickedTaskId } = state;
//   
//   return {
//     clickedTaskId
//   }  
// } 

// export default connect(mapStateToProps)(EditTaskModal);

EditTaskModal.propTypes = {
  
}
