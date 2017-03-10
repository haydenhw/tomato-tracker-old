import React, { Component } from 'react';
import { Link, Route } from 'react-router';
import * as actions from '../actions/indexActions';
import store  from '../store';

const style = {
  "cursor": "pointer",
  "display": "block",
  "width": "125px"
}
function fectchProject(projectId) {
  store.dispatch(actions.fetchProjectById(projectId))
}

export default function ProjectLink(props) {
  return <span style={style} onClick={() => fectchProject(props.projectId) }>{props.projectName}</span>
}
