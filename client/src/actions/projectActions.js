import { projectsUrl } from '../config/endpointUrls';

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