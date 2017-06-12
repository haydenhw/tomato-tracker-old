import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeSelectedProject } from '../actions/indexActions';

import TimeTracker from './TimeTracker';

class TimeTrackerPage extends Component {
  constructor() {
    super();
    
    this.state = {
      selectedProjectId: null
    }
  }
  componentDidMount() {
    /*console.log('mounting')
    this.setState({isFetching: true});
    
    fetch('/projects')
    .then(res => res.json())
    .then((data) => {
    console.log(data)
    this.setState({
    tasks: data.projects[0].tasks,
    isFetching: false
  });
})
.catch((err) => {
this.setState({isFetching: false});
console.error(err);
});*/
}

setSelectedProject(projectId) {
  console.log(this.state.selectedProjectId);
  this.setState({selectedProjectId: projectId});
}

render() {
  const { projects } = this.props;
  
  const selectedProjectId = this.state.selectedProjectId || projects[0].shortId;
  const selectedProjectIndex = projects.findIndex(project => project.shortId === selectedProjectId);
  const selectedProject = projects[selectedProjectIndex];
  const selectedTasks = selectedProject.tasks;
  
  return (
    <div className="time-tracker-page-container">
      <TimeTracker
        projects={projects}
        selectedProject={selectedProject}
        setSelectedProject={this.setSelectedProject.bind(this)}
        tasks={selectedTasks}
      />
    </div>
  );
}
}

const mapStateToProps = state => {
  const { projects } = state;
  
  return {
    projects
  }
}

export default connect(mapStateToProps, {
  changeSelectedProject
})(TimeTrackerPage);

TimeTrackerPage.propTypes = {
  projects: PropTypes.array
}
