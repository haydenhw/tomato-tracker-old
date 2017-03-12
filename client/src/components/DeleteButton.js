import React, { Component } from 'react';
import * as actions from '../actions/indexActions';
import store from '../store';

export default function DeleteButton(props){
  function handleClick() {
    store.dispatch(actions.deleteProject(props.projectId));
  }
  
  return (
    <button onClick={() => handleClick()}>X</button>
  );
}