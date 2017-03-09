import { projectsUrl } from '../config/endpointUrls';

export const UPDATE_BOARD_POSITION = 'UPDATE_BOARD_POSITION'; 
export const updateBoardPosition = (position) => ({
  type: 'UPDATE_BOARD_POSITION',
  position
});

export const UPDATE_BOARD_DIMENSIONS = 'UPDATE_BOARD_DIMENSIONS'; 
export const updateBoardDimensions = (dimensions) => ({
  type: 'UPDATE_BOARD_DIMENSIONS',
  dimensions
});

export const FETCH_MODULES_SUCCESS = 'FETCH_MODULES_SUCCESS'; 
export const fetchModulesSuccess = (modules) => ({
  type: 'FETCH_MODULES_SUCCESS',
  modules
});

export function fetchModules(url) {
  return (dispatch) => {
    fetch(url)
    .then((res) => {
      return res.json();
    })
    .then(data => {
      dispatch(fetchModulesSuccess(data));
    })
    .catch(err => {
      console.error(err)
    })
  }
}

export const FETCH_PROJECTS_SUCCESS = 'FETCH_PROJECTS_SUCCESS'; 
export const fetchProjectsSuccess = (projects) => ({
  type: 'FETCH_PROJECTS_SUCCESS',
  projects
});

export function fetchProjects(projectsUrl) {
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

export const SAVE_MODULE_POSITION_SUCCESS = 'SAVE_MODULE_POSITION_SUCCESS'; 
export const saveModulePositionSuccess = (modules) => ({
  type: 'SAVE_MODULE_POSITION_SUCCESS',
  modules
});

export function saveModulePosition(
  url,
  {method: PUT}
  ) {
  return (dispatch) => {
    fetch(url)
    .then((res) => {
      return res.json();
    })
    .then(data => {
      dispatch({  
        type: 'SAVE_MODULE_POSITION_SUCCESS',
        data});
       
      
    })
    .catch(err => {
      console.error(err)
    })
  }
}