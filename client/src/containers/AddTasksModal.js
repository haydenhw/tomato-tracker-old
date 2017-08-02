import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import { changeModalType } from '../actions/indexActions';

import FormModal from '../components/FormModal';
import AddTasksFormContainer from './AddTasksFormContainer';

function AddTasksModal(props) {
  const { lastAddedProjectName } = props;
  console.log(lastAddedProjectName)
  return (
    <AddTasksFormContainer
      title={"Add tasks for project "}
      titleName={lastAddedProjectName}
    />
  );
}

const mapStateToProps = state => {
  const { projects } = state;
  
  const lastAddedProjectName = projects.items.length > 0 
    ? projects.items[projects.items.length-1].projectName
    : null;
  
  return {
    lastAddedProjectName  
   }  
} 

export default connect(mapStateToProps, { changeModalType })(AddTasksModal);

AddTasksModal.propTypes = {
  
}
