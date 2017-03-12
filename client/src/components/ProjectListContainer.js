import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/indexActions';
import store from '../store';
import ProjectLink from './ProjectLink';

class ProjectListContainer extends Component {
  
  componentDidMount() {
    store.dispatch(actions.fetchProjects());
  }

  render() {
    const { projects } = this.props;
    
    if (projects) {
      const projectList = projects.map((project, index) => {
        return <ProjectLink key={index} projectId={ project._id } projectName={project.name} /> 
      });
      
      return (
        <div>
          {projectList}
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