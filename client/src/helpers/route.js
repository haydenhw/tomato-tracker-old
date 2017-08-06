import { hashHistory } from 'react-router';

import store from '../redux-files/store.js'
import { changeActiveLink } from '../actions/indexActions';

export const routeToProjectsPage = () => {
  store.dispatch(changeActiveLink('PROJECTS'));
  hashHistory.push('/projects');
}

export const routeToTimerPage = () => {
  store.dispatch(changeActiveLink('TIMER'))
  hashHistory.push('/');
} 
