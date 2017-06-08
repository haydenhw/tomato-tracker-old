import React, { Component } from 'react';
import PropTypes form 'prop-types';
import { Field, reduxForm } from 'redux-form';

class ProjectForm extends Component {
  render() {
    const { handleSubmit, projects } = this.props;
    
    return (
      <form className="project-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projectName">Project Name</label>
          <Field name="projectName" component="input" type="text"/>
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field name="email" component="input" type="email"/>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

// Decorate the form component
ProjectForm = reduxForm({
  form: 'project' // a unique name for this form
})(ProjectForm);

export default ProjectForm;

ProjectForm.propTypes = {
  
}