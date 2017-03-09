import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/action-index';


class ProjectList extends Component {
  
  componentDidMount() {
    this.props.getProjects();
  }

  render() {
    console.log(this.props.projects)
    if (this.props.projects) {
      
      const projectList = this.props.modules.map((project, index) => {
        return <li key={index}> {project.function} </li> 
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