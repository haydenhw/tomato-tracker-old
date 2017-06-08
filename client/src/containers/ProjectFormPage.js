import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';

import { addTask } from '../actions/indexActions';
import ProjectForm from '../components/ProjectForm';
console.log(addTask);

class ProjectFormPage extends Component {
  
  
  handleFormSubmit = (values) => {
    console.log(values)
  }
  
  addTask = (evt) => {
    evt.preventDefault();
    console.log(evt.nativeEvent.target);
  }
  
  renderFormTask (task) {
    const { taskName } = task;
     
    return (
      <div className="form-task-list-item" key={shortid.generate()}>
        <span>{taskName}</span>
        <div className="button-wrapper">
          <button>&times;</button>
        </div>
      </div>
    );
  }
  
  render() {
    store.dispatch({
      type:'ADD_TASK',
      projectId: '123',
      taskName: 'new task'
    })
    
    const { params } = this.props;
    const { projectId } = params;
    
    const data = getProjects();
    const activeProject = data.find(project => project.shortId = projectId);
    
    return (
      <ProjectForm 
        project={activeProject}
        handleTaskSubmit={this.addTask}
        handleSubmit={this.handleFormSubmit}
        renderFormTask={this.renderFormTask}
      />
    );
  }
  
  mapStateToProps = (state) => {
    const { projects } = state;
    
    return {
      projects
    }
  }
}

export default connect({ addTask })(ProjectFormPage);  

function getProjects() {
  return ([
    {
      projectName: "Node Capstone",
      shortId: '123',
      tasks: [
        {
          taskName: 'user flows',
          recordedTime: Math.random() * 100,
          id: shortid.generate()
        },
        {
          taskName: 'mock up',
          recordedTime: Math.random() * 100,
          id: shortid.generate()
        },
        {
          taskName: 'mvp',
          recordedTime: Math.random() * 100,
          id: shortid.generate()
        },
      ]
    },
    {
      projectName: "React Capstone",
      shortId: '456',
      tasks: [
        {
          taskName: 'user flows',
          recordedTime: Math.random() * 100,
          id: shortid.generate()
        },
        {
          taskName: 'mock up',
          recordedTime: Math.random() * 100,
          id: shortid.generate()
        },
        {
          taskName: 'mvp',
          recordedTime: Math.random() * 100,
          id: shortid.generate()
        },
      ]
    },
  ])
}