import { hashHistory } from 'react-router';

export const routeToTimerPage = () => {
  hashHistory.push('/');
  window.scrollTo(0,0);
}

export const routeToProjectsPage = () => {
  hashHistory.push('/projects');
  window.scrollTo(0,0);
}

export const routeToLogPage = () => {
  // TODO delete references to this function
}
