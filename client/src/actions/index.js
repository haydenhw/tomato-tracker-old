export const FETCH_MODULES_SUCCESS = 'FETCH_MODULES_SUCCESS'; 
export const fetchModulesSuccess = (modules) => ({
  type: 'FETCH_MODULES_SUCCESS',
  modules
});

export function fetchModules(url) {

  return (dispatch) => {
    /*console.log(url)
    fetch(url)
    .then(function(response) { 
  // Convert to JSON
  return response.json();
  })
  .then(function(j) {
  // Yay, `j` is a JavaScript object
  console.log(j); 
  });*/
    
    
    fetch(
      'modules',
      {method: 'get'})
    .then((res) => {
      return res.json();
    })
    .then(data => {
      console.log(data)
      dispatch(fetchModulesSuccess(data));
    })
    .catch(err => {
      console.error(err)
    })
  }
}