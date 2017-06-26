import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { postProject } from '../actions/indexActions';

import AddProjectForm from '../components/AddProjectForm';
import AddTasksFormContainer from './AddTasksFormContainer';

let AddProjectPage = class extends Component {
    
  handleSubmit() {
    this.AddProjectForm.submit()
  }  
  
  handleAddProject = (handleSubmit) => handleSubmit((values) => {
    console.log(values)
    const { postProject } = this.props;
//    postProject(projectName)
  })
  
  render() {
    const { handleSubmit } = this.props;
    console.log(handleSubmit)
    return(
      <div>
        <h2>Project Name</h2>
        <AddProjectForm ref={node => this.AddProjectForm = node} onSubmit={this.handleAddProject(handleSubmit)} shouldRenderSubmitButton={false}/>
        {/* <AddTasksFormContainer /> */}
        <button className="parent" onClick={this.handleSubmit.bind(this)}>Parent Submit</button>
      </div>
    );
  }
}
const mapStateToProps = state => {

}

AddProjectPage = connect(null, {
  postProject
})(AddProjectPage);

export default reduxForm({
  form: 'addProjectPage'
})(AddProjectPage)

AddProjectPage.propTypes = {
  //taskData: PropTypes.object.isRequired
}