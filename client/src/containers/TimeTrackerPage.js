import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import {
  deleteTask,
  decrementTimer,
  changeActiveEditMenu,
  fetchProjects,
  setSelectedProject,
  toggleAddTasksForm,
  toggleEditTaskForm
} from '../actions/indexActions';

import TimeTracker from './TimeTracker';

class TimeTrackerPage extends Component {
  
componentWillMount() {
  const { hasFetched, projects } = this.props;
// console.log(hasFetched  !projects.length)  
  if (hasFetched && !projects.length) {
    hashHistory.push('/projects')
  }
}

render() {
  const { 
    changeActiveEditMenu,
    decrementTimer,
    deleteTask,
    hasFetched,
    isFetching,
    isTimerActive,
    projects,
    selectedProjectId,
    setSelectedProject,
    toggleAddTasksForm, 
    toggleEditTaskForm
  } = this.props;
  
  if (!hasFetched) {
    return <div className="loader">Loading...</div>
  }
  
  const selectedProjectIndex = selectedProjectId && projects.findIndex(project => project.shortId === selectedProjectId);
  const selectedProject = (selectedProjectIndex !== null && !isNaN(selectedProjectIndex)) && projects[selectedProjectIndex];
  const selectedTasks = selectedProject && selectedProject.tasks;
  
  return (
    <div className="time-tracker-page-container">
      <TimeTracker
        changeActiveEditMenu={changeActiveEditMenu}
        decrementTimer={decrementTimer}
        deleteTask={deleteTask}
        projects={projects}
        hasFetched={hasFetched}
        isFetching={isFetching}
        isTimerActive={isTimerActive}
        selectedProject={selectedProject || null}
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
  const { hasFetched, isFetching } = projects;
  const { isTimerActive } = timer;
  
  return {
    selectedProjectId,
    hasFetched, 
    isFetching,
    isTimerActive, 
    projects: projects.items
  }
}

export default connect(mapStateToProps, {
  changeActiveEditMenu,
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
