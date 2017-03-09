import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/action-index';


class ProjectList extends Component {
  
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    const { projects } = this.props;
    
    if (projects) {
      const projectList = projects.map((project, index) => {
        return <li key={index}> {project.name} </li> 
      });
      
      return (
          <ul>
              {projectList}
          </ul>
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

const mapDispatchToProps = (dispatch) => {
  return {
      getProjects: () => dispatch(actions.fetchProjects())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);