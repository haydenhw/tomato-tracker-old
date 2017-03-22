import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import ProjectsList from './ProjectsList';
import ProjectsSubmitForm from './ProjectsSubmitForm'

export default function Projects() {
    return (
      <div>
          <h1>
              Projects
          </h1>
          <ProjectsSubmitForm />
          <ProjectsList />
      </div>
    );
};

