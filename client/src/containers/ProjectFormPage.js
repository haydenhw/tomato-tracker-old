import  React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';

import { addTask } from '../actions/indexActions';
import ProjectForm from '../components/ProjectForm';

class ProjectFormPage extends Component {
  constructor() {
    super()
    
    this.addNewTask = this.addNewTask.bind(this);
  }
  static defaultProps = {
    projects: []
  }
  
  editProjectName (values) { 
    console.log(values)
  }
  
  addNewTask (values) {
    this.props.addTask('123', 'new task');
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
    const { params } = this.props;
    const { projectId } = params;
    
    const data = getProjects();
    const activeProject = data.find(project => project.shortId = projectId);
    
    return (
      <ProjectForm 
        project={activeProject}
        handleEditTasksSubmit={this.addNewTask}
        handleEditProjectSubmit={this.editProjectName}
        renderFormTask={this.renderFormTask}
      />
    );
  }
  
  }
  const mapStateToProps = (state) => {
    const { projects } = state;
    
    return {
      projects
    }
}

ProjectFormPage.propTypes = {
  projects: PropTypes.array
}

export default connect(mapStateToProps, { addTask })(ProjectFormPage);  

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