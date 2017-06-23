import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteTask, decrementTimer, fetchProjects, setActiveProject, toggleAddTasksForm, toggleEditTasksForm  } from '../actions/indexActions';


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
    toggleEditTasksForm
  } = this.props;
  const activeProjectIndex = activeProjectId && projects.findIndex(project => project.shortId === activeProjectId);
  const activeProject = !isNaN(activeProjectIndex) && projects[activeProjectIndex];
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
        toggleEditTasksForm={toggleEditTasksForm}
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
    projects
  }
}

export default connect(mapStateToProps, {
  deleteTask,
  fetchProjects,
  decrementTimer,
  setActiveProject,
  toggleAddTasksForm,
  toggleEditTasksForm 
  
})(TimeTrackerPage);

TimeTrackerPage.propTypes = {
  projects: PropTypes.array
}
