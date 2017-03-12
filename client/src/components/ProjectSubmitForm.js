import React, { Component } from 'react';
import { Router, Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions/indexActions';
import store from '../store';


class ProjectSubmitForm extends Component {
  handleSubmit(event) {
    const newProject = {
      "name": this.input.value,
      "boardSpecs": {
        "x": 50,
        "y": 50,
        "height": 300,
        "width": 500
      },
      "modules":  [
      {
        "height": 50,
        "width": 50,
        "x": 25,
        "y": 25,
        "onBoard": true,
        "image": "http://i68.tinypic.com/24oouoj.png",
        "id": 0,
        "_id": "58c330a771284629ecef4132"
      },
      {
        "height": 50,
        "width": 50,
        "x": 125,
        "y": 125,
        "onBoard": true,
        "image": "http://i65.tinypic.com/s4s0ah.png",
        "id": 1,
        "_id": "58c330a771284629ecef4131"
      }
    ]
  }
    
  store.dispatch(actions.postNewProject(newProject));  
  }
  
  render() {
    const labelStyle ={
      "fontSize": "20px"
    }
    
    const inputStyle ={
      "marginLeft": "10px"
    }
    
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <label style={labelStyle}>
          Create New Project: 
          <input style={inputStyle} type="text" ref={(input) => this.input = input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
};

const mapStateToProps = (state, props) => ({
  state: state
});

const mapDispatchToProps = (dispatch) => {
  return {
      getData: (url) => dispatch(actions.fetchModules(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSubmitForm);