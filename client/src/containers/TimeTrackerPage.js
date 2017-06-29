import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

render() {
  const { 
    selectedProjectId,
    decrementTimer,
    deleteTask,
    isTimerActive,
    projects,
    setSelectedProject,
    toggleAddTasksForm, 
    toggleEditTaskForm
  } = this.props;
  
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
  const { isTimerActive } = timer;
  
  return {
    selectedProjectId,
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
