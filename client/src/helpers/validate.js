  
  function isUndefined(value) {
    if (typeof value === 'undefined' || value === undefined) {
      return true;
    }
    return false;
  }
  
  function hasAnyValue(value) {
    if (isUndefined(value) || String(value).trim() === '') {
      return false;
    }
    return true;
  }

  function isDuplicate(value, array) {
      if (array.indexOf(value) === -1) {
        return false;
      }
      return true;
  }
  
  export default function validate(getState) {
    return ({ projectName }) => {
      
      const projectNames = getState().projects.map(project => project.projectName);
      const error = {};
      if (!hasAnyValue(projectName)) {
        error.projectName = "Project name is required" 
      }  
      
      if (isDuplicate(projectName, projectNames)) {
        error.projectName = `Another project with the name '${projectName}' already exists`;
      }
      
      return error;
    }
  }
  