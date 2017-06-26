import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { postProject } from '../actions/indexActions';

import AddProjectForm from '../components/AddProjectForm';
import AddTasksFormContainer from './AddTasksFormContainer';

class AddProjectPage extends Component {
  handleAddProject = () => ({ projectName }) => {
    const { postProject } = this.props;
    postProject(projectName)
  }
  
  render() {
    return(
      <div>
        <h2>Project Name</h2>
        <AddProjectForm handleProjectSubmit={this.handleAddProject()} />
        <AddTasksFormContainer />
      </div>
    );
  }
}
const mapStateToProps = state => {

}

export default connect(null, {
  postProject
})(AddProjectPage);


AddProjectPage.propTypes = {
  //taskData: PropTypes.object.isRequired
}