import React, { Component } from 'react';
import { Router, Link, hashHistory } from 'react-router';
import { connect } from 'react-redux';
import ProjectListContainer from './ProjectListContainer'
import ProjectSubmitForm from './ProjectSubmitForm'
import * as actions from '../actions/indexActions';
import store from '../store';
import { Button } from 'react-bootstrap';

export default function Projects() {
    return (
      <div>
          <h1>
              Projects
          </h1>
          <ProjectSubmitForm />
          <ProjectListContainer />
      </div>
    );
};

