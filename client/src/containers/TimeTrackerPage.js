import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { decrementTimer, setActiveProject } from '../actions/indexActions';

import TimeTracker from './TimeTracker';

class TimeTrackerPage extends Component {
  componentDidMount() {
    const { activeProjectId, projects, setActiveProject } = this.props;
     if (!activeProjectId) {
       console.log(activeProjectId)
       setActiveProject(projects[0].shortId)
     }
    
    
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



render() {
  const { decrementTimer, projects, setActiveProject } = this.props;

  const activeProjectId = this.props.activeProjectId || projects[0].shortId;
  const activeProjectIndex = projects.findIndex(project => project.shortId === activeProjectId);
  const activeProject = projects[activeProjectIndex];
  const selectedTasks = activeProject.tasks;
  
  return (
    <div className="time-tracker-page-container">
      <TimeTracker
        activeProject={activeProject}
        decrementTimer={decrementTimer}
        projects={projects}
        setActiveProject={setActiveProject}
        tasks={selectedTasks}
      />
    </div>
  );
}
}

const mapStateToProps = state => {
  const { activeProjectId, projects } = state;
  
  return {
    activeProjectId,
    projects
  }
}

export default connect(mapStateToProps, {
  decrementTimer,
  setActiveProject
})(TimeTrackerPage);

TimeTrackerPage.propTypes = {
  projects: PropTypes.array
}
