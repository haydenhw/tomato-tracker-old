import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import { changeModalType } from '../actions/indexActions';

import FormModal from '../components/FormModal';
import AddTasksFormContainer from './AddTasksFormContainer';

function AddTasksModal(props) {
  const { lastAddedProjectName } = props;
  
  return (
    <AddTasksFormContainer
      title={"Add tasks for project "}
      titleName={lastAddedProjectName}
    />
  );
}

const mapStateToProps = state => {
  const { projects } = state;
  
  return {
    lastAddedProjectName: projects.items[projects.items.length-1].projectName
  }  
} 

export default connect(mapStateToProps, { changeModalType })(AddTasksModal);

AddTasksModal.propTypes = {
  
}
