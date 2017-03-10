import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/indexActions';
import store from '../store';
import projectsUrl from '../config/endpointUrls';

class SaveButton extends Component {
  
  saveProject() {
    const {
      width,
      height,
      x,
      y,
      projectName,
      id
    } = this.props;
    
    const updatedProject = {
      projectName,
      "boardSpecs": {
        width,
        height,
        x,
        y
      }
    }
    
    const url = `${'projects'}/${id}`;
    fetch(url, {
      method: 'put',
      body: JSON.stringify(updatedProject),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .catch(err => {
      console.error(err)
    })
  }

  render() {
    return (
      <button onClick={this.saveProject.bind(this)}>
        Save
      </button>
    );
  }
}

const mapStateToProps = (state) => ({
  width: state.boardSpecs.width,
  height: state.boardSpecs.height,
  x: state.boardSpecs.x,
  y: state.boardSpecs.y,
  projectName: state.currentProjectInfo.name,
  id: state.currentProjectInfo.id
});

export default connect(mapStateToProps)(SaveButton);