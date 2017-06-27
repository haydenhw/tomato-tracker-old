import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, submit } from 'redux-form';

import { postProject } from '../actions/indexActions';

import AddProjectForm from '../components/AddProjectForm';
import AddTasksFormContainer from './AddTasksFormContainer';

let AddProjectPage = class extends Component {
  handleProjectSubmit() {
    const { submit, postProject } = this.props;
    //submit('addProject')
    postProject('new prefdsafdsa')//.then(() => console.log('hello'))
    
  }
  
  render() {
    const { handleSubmit } = this.props;
    
    return(
      <div>
        <form onSubmit={handleSubmit(this.handleProjectSubmit.bind(this))}>
          <h2>Project Name</h2>
          <AddProjectForm shouldRenderSubmitButton={false}/>
          {/* <AddTasksFormContainer /> */}
          <button className="parent" type="submit">Parent Submit</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {

}

AddProjectPage = reduxForm({
  form: "addProject"
})(AddProjectPage);

export default AddProjectPage = connect(null, {
  postProject,
  submit
})(AddProjectPage);


AddProjectPage.propTypes = {
  //taskData: PropTypes.object.isRequired
}