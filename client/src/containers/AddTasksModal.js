import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import { changeModalType } from '../actions/indexActions';

import FormModal from '../components/FormModal';
import AddTasksFormContainer from './AddTasksFormContainer';

function AddTasksModal(props) {
  const { selectedProjectName } = props;
  
  return (
    <AddTasksFormContainer
      fieldAnimationName="bounceInDown-second"
      formAnimationName="bounceInDown"
      titleAnimationName="bounceInDown"
      title={"Add tasks for project "}
      titleName={selectedProjectName}
    />
  );
}

const mapStateToProps = state => {
  const { projects, selectedProjectId } = state;
  
  const selectedProjectName = projects.items.find(project => project.shortId === selectedProjectId).projectName;
  
  return {
    selectedProjectName  
   }  
} 

export default connect(mapStateToProps, { changeModalType })(AddTasksModal);

AddTasksModal.propTypes = {
  
}
