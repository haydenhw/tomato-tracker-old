import { projectsUrl } from '../config/endpointUrls';
import { Route, hashHistory } from 'react-router';
import store from '../store';

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
      console.log(data)
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

export function fetchProjectById(projectId, currentRoute) {
  const projectUrl = `${projectsUrl}/${projectId}`
  return (dispatch) => {
    fetch(projectUrl)
    .then((res) => {
      return res.json();
    })
    .then(data => {
      console.log("get response", data.boardSpecs.x, data.boardSpecs.y, data.boardSpecs.height, data.boardSpecs.width)
      dispatch(fetchProjectByIdSuccess(data));
      const designRoute =`/design/${projectId}`;
      
      if(currentRoute !== designRoute){
        hashHistory.push(designRoute)
      }
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

export function postNewProject(newProject) {
  return (dispatch) => {
    fetch(
      projectsUrl,
      {
          method: "POST",
          body: JSON.stringify(newProject),
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
      })
      .then((res) => {
        return res.json();
      })
      .then(data => {
        console.log('New project saved')
        const projectId = data._id;
        console.log(projectId);
        /*store.dispatch(
          actions.fetchProjectById(projectId)*/
          dispatch(fetchProjectById(projectId));
        
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

export const DELETE_PROJECT_SUCCESS = 'DELETE_PROJECT_SUCCESS'; 
export const deleteProjectSuccess = (projectId, projects) => ({
  type: 'DELETE_PROJECT_SUCCESS',
  projectId,
  p
});

export function deleteProject(projectId, projects) {
  const url = `${projectsUrl}/${projectId}`
  return (dispatch) => {
    fetch(
      url,
      {
          method: "DELETE",
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
      })
      .then((res) => {
        console.log('delete successful')
        dispatch(fetchProjects());
      })
      .catch(err => {
        console.error(err)
      })
  }
}