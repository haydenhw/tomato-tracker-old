import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, submit } from 'redux-form';

import { postProject } from '../actions/indexActions';

import AddProjectForm from '../components/AddProjectForm';
import AddTasksFormContainer from './AddTasksFormContainer';

let AddProjectPage = class extends Component {
  handleProjectSubmit = (tasks) => () => {
    const { submit, postProject } = this.props;
    submit('addProject')
    console.log(tasks)
    // postProject('new prefdsafdsa').then(() => console.log('hello'))
  }
  testSubmit(){
    const { submit, postProject } = this.props;
    submit('addProjectForm')  
  }
  
  render() {
    const { submit } = this.props;
    
    return(
      <div>
        <h2>Project Name</h2>
        <AddProjectForm shouldRenderSubmitButton={false} />
        <AddTasksFormContainer />  
        <button onClick={() => submit('addProjectForm')}>Submit</button>
        </div>
      );
    }
  }
  const mapStateToProps = state => {
    
  }

  export default AddProjectPage = connect(null, {
    postProject,
    submit
  })(AddProjectPage);
  
  
  AddProjectPage.propTypes = {
    //taskData: PropTypes.object.isRequired
  }