import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';

import { changeSelectedProject } from '../actions/indexActions';

import TimeTracker from './TimeTracker';

class TimeTrackerPage extends Component {
  
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
    const { projects } = this.props;
    const tasks = projects[0].tasks;
    
    return (
      <div className="time-tracker-page-container">
        <TimeTracker projects={projects} tasks={tasks} />
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
