import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setActiveProject } from '../actions/indexActions';

import TimeTracker from './TimeTracker';

class TimeTrackerPage extends Component {
  constructor() {
    super();
    
    this.state = {
      activeProjectId: null
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



render() {
  const { projects, setActiveProject } = this.props;
  
  const activeProjectId = this.state.activeProjectId || projects[0].shortId;
  const ActiveProjectIndex = projects.findIndex(project => project.shortId === activeProjectId);
  const ActiveProject = projects[ActiveProjectIndex];
  const selectedTasks = ActiveProject.tasks;
  
  return (
    <div className="time-tracker-page-container">
      <TimeTracker
        projects={projects}
        ActiveProject={ActiveProject}
        setActiveProject={setActiveProject}
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
  setActiveProject
})(TimeTrackerPage);

TimeTrackerPage.propTypes = {
  projects: PropTypes.array
}
