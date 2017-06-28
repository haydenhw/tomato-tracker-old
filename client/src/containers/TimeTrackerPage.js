import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  deleteTask,
  decrementTimer,
  fetchProjects,
  setActiveProject,
  toggleAddTasksForm,
  toggleEditTaskForm 
} from '../actions/indexActions';


import TimeTracker from './TimeTracker';

class TimeTrackerPage extends Component {

render() {
  const { 
    activeProjectId,
    decrementTimer,
    deleteTask,
    isTimerActive,
    projects,
    setActiveProject,
    toggleAddTasksForm, 
    toggleEditTaskForm
  } = this.props;
  
  const activeProjectIndex = activeProjectId && projects.findIndex(project => project.shortId === activeProjectId);
  const activeProject = (activeProjectIndex !== null && !isNaN(activeProjectIndex)) && projects[activeProjectIndex];
  const selectedTasks = activeProject && activeProject.tasks;
  
  return (
    <div className="time-tracker-page-container">
      <TimeTracker
        activeProject={activeProject || null}
        decrementTimer={decrementTimer}
        deleteTask={deleteTask}
        projects={projects}
        isTimerActive={isTimerActive}
        setActiveProject={setActiveProject}
        tasks={selectedTasks || []}
        toggleAddTasksForm={toggleAddTasksForm} 
        toggleEditTaskForm={toggleEditTaskForm}
      />
    </div>
  );
}
}

const mapStateToProps = state => {
  const { activeProjectId, projects, timer } = state;
  const { isTimerActive } = timer;
  
  return {
    activeProjectId,
    isTimerActive, 
    projects: projects.items
  }
}

export default connect(mapStateToProps, {
  deleteTask,
  fetchProjects,
  decrementTimer,
  setActiveProject,
  toggleAddTasksForm,
  toggleEditTaskForm 
  
})(TimeTrackerPage);

TimeTrackerPage.propTypes = {
  projects: PropTypes.array
}
