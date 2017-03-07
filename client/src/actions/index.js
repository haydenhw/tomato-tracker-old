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