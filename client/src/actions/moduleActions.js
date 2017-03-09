import { projectsUrl } from '../config/endpointUrls';

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

