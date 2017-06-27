import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, submit } from 'redux-form';

import { postProject } from '../actions/indexActions';

import AddProjectForm from '../components/AddProjectForm';
import AddTasksFormContainer from './AddTasksFormContainer';

let AddProjectPage = class extends Component {
  constructor() {
    super() 
      this.state = {
        newTasks: []
      }
  }
  
  componentDidUpdate(prevProps) {
    
    if (prevProps.queuedProject !== this.props.queuedProject) {
      const { postProject, queuedProject } = this.props;
      const { newTasks } = this.state;
      console.log('diff')
      console.log(this.state.newTasks)
      postProject(queuedProject, newTasks)
    }
  }
  
  handleProjectSubmit = (tasks) => () => {
    const { submit } = this.props;
    
    this.setState({ newTasks: tasks}, () => submit('addProjectForm'));
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
        <AddTasksFormContainer handleFormSubmit={this.handleProjectSubmit} />  
        {/* <button onClick={this.handleProjectSubmit}>Submit</button> */}
        </div>
      );
    }
  }
  const mapStateToProps = state => {
    const { projects } = state;
    
    return {
      queuedProject: projects.queue
    }
  }

  export default AddProjectPage = connect(mapStateToProps, {
    postProject,
    submit
  })(AddProjectPage);
  
  
  AddProjectPage.propTypes = {
    //taskData: PropTypes.object.isRequired
  }