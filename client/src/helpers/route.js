import { hashHistory } from 'react-router';

export const routeToProjectsPage = () => {
  hashHistory.push('/projects');
}

export const routeToTimerPage = () => {
  hashHistory.push('/');
} 
