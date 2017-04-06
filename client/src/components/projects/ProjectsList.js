import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import ProjectsItem from './ProjectsItem';

class ProjectListContainer extends Component {
  componentDidMount() {
    store.dispatch(actions.fetchProjects());
  }

  render() {
    const { projects } = this.props;
    
    if (projects) {
      const projectsList = projects.map((project, index) => {
        return <ProjectsItem key={index} projectId={ project._id } projectName={project.name} /> 
      });
      
      return (
        <div>
          {projectsList}
        </div>
      );
    } 
    else {
      return <div></div>
    }
  }
};

const mapStateToProps = (state, props) => ({
  projects: state.projectList
});

export default connect(mapStateToProps)(ProjectListContainer);