import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import {
  deleteTask,
  decrementTimer,
  fetchProjects,
  setSelectedProject,
  toggleAddTasksForm,
  toggleEditTaskForm 
} from '../actions/indexActions';


import TimeTracker from './TimeTracker';

class TimeTrackerPage extends Component {
  
componentWillMount() {
  const { hasFetched, projects } = this.props;
  if (hasFetched && !projects.length) {
    hashHistory.push('/projects')
  }
}

render() {
  const { 
    selectedProjectId,
    decrementTimer,
    deleteTask,
    hasFetched,
    isTimerActive,
    projects,
    setSelectedProject,
    toggleAddTasksForm, 
    toggleEditTaskForm
  } = this.props;
  
  if (!hasFetched) {
    return <div>Loading...</div>
  }
  
  const selectedProjectIndex = selectedProjectId && projects.findIndex(project => project.shortId === selectedProjectId);
  const selectedProject = (selectedProjectIndex !== null && !isNaN(selectedProjectIndex)) && projects[selectedProjectIndex];
  const selectedTasks = selectedProject && selectedProject.tasks;
  
  return (
    <div className="time-tracker-page-container">
      <TimeTracker
        selectedProject={selectedProject || null}
        decrementTimer={decrementTimer}
        deleteTask={deleteTask}
        projects={projects}
        isTimerActive={isTimerActive}
        setSelectedProject={setSelectedProject}
        tasks={selectedTasks || []}
        toggleAddTasksForm={toggleAddTasksForm} 
        toggleEditTaskForm={toggleEditTaskForm}
      />
    </div>
  );
}
}

const mapStateToProps = state => {
  const { selectedProjectId, projects, timer } = state;
  const { hasFetched } = projects;
  const { isTimerActive } = timer;
  
  return {
    selectedProjectId,
    hasFetched, 
    isTimerActive, 
    projects: projects.items
  }
}

export default connect(mapStateToProps, {
  deleteTask,
  fetchProjects,
  decrementTimer,
  setSelectedProject,
  toggleAddTasksForm,
  toggleEditTaskForm 
  
})(TimeTrackerPage);

TimeTrackerPage.propTypes = {
  projects: PropTypes.array
}
