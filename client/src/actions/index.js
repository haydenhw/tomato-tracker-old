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