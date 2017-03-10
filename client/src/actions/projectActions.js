import { projectsUrl } from '../config/endpointUrls';
import { Route, hashHistory } from 'react-router';

export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS'; 
export const fetchProjectsSuccess = (projects) => ({
  type: 'FETCH_PROJECTS_SUCCESS',
  projects
});

export function fetchProjects() {
  return (dispatch) => {
    fetch(projectsUrl)
    .then((res) => {
      return res.json();
    })
    .then(data => {
      dispatch(fetchProjectsSuccess(data));
    })
    .catch(err => {
      console.error(err)
    })
  }
}

export const FECTCH_PROJECT_BY_ID_SUCCESS = 'FECTCH_PROJECT_BY_ID_SUCCESS'; 
export const fetchProjectByIdSuccess = (project) => ({
  type: 'FECTCH_PROJECT_BY_ID_SUCCESS',
  project
});

export function fetchProjectById(projectId) {
  const projectUrl = `${projectsUrl}/${projectId}`
  
  return (dispatch) => {
    fetch(projectUrl)
    .then((res) => {
      return res.json();
    })
    .then(data => {
      dispatch(fetchProjectByIdSuccess(data));
      hashHistory.push('/design')
    })
    .catch(err => {
      console.error(err)
    })
  }
}

export const POST_NEW_PROJECT_SUCCESS = 'POST_NEW_PROJECT_SUCCESS'; 
export const postNewProjectSuccess = (modules) => ({
  type: 'POST_NEW_PROJECT_SUCCESS',
  modules
});

export function postNewProject(projectsUrl) {
  return (dispatch) => {
    fetch(
      projectsUrl,
      {
          method: "POST",
          body: JSON.stringify({position: [this.props.x, this.props.y]}),
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
      })
      .then((res) => {
        return res.json();
      })
      .then(data => {
        alert( JSON.stringify( data ));
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export const UPDATE_PROJECT_SUCCESS = 'UPDATE_PROJECT_SUCCESS'; 
export const updateProjectSuccess = (modules) => ({
  type: 'UPDATE_PROJECT_SUCCESS',
  modules
});

export function updateProject(data, projectId) {
  return (dispatch) => {
    fetch(projectsUrl + projectId, {
        method: 'put',
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        return res.json();
      })
      .then(data => {
        alert( JSON.stringify( data ));
      })
      .catch(err => {
        console.error(err)
      })
  }
}
