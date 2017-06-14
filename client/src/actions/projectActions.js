import shortid from 'shortid';

export const ADD_PROJECT = "ADD_PROJECT";
export function addProject(projectName) {
  const newProject = {
    projectName,
    tasks: [],
    shortId: shortid.generate()
  }
  
  return {
    type: "ADD_PROJECT",
    project: newProject
  }
}

export const UPDATE_TASKS = "UPDATE_TASKS";
export function updateTasks(projectId, newTasks) {
  return {
    type: "UPDATE_TASKS",
    projectId,
    newTasks
  }
}

export const SET_ACTIVE_PROJECT = "SET_ACTIVE_PROJECT";
export function setActiveProject(projectId) {
  return {
    type: "SET_ACTIVE_PROJECT",
    projectId
  }
}

export const DELETE_TASK = "DELETE_TASK";
export function deleteTask(projectId, taskId) {
  return {
    type: 'DELETE_TASK',
    projectId,
    taskId
  }
}

export const POST_PROJECT_REQUEST = 'POST_PROJECT_REQUEST'; 
export function postProjectRequest(project) {
  return {
    type: 'POST_PROJECT_REQUEST',
    project
  }
}

export const POST_PROJECT_SUCCESS = 'POST_PROJECT_SUCCESS'; 
export function postProjectSuccess(projectId, databaseId) {
  return {
    type: 'POST_PROJECT_SUCCESS',
    projectId,
    databaseId
  }
}

export function postProject(projectName) {
  
  return (dispatch) => {
    const newProject = {
      projectName,
      shortId: shortid.generate(),
      tasks: []
    }
    
    dispatch(postProjectRequest(newProject));
    
    fetch(
      'projects',
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
        const projectId = data.shortId;
        const databaseId = data._id;
        
        dispatch(postProjectSuccess(projectId, databaseId))
      })
      .catch(err => {
        console.error(err)
      })
  }
}

export function postTask(projectId, task) {
  console.log('called postTask')
  return (dispatch) => {
    console.log('fetching')
    fetch(
      `projects/${projectId}`,
      {
          method: "POST",
          body: JSON.stringify(task),
          headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
      })
      .then((res) => {
        return res.json();
      })
      .then(data => {
          console.log('task add success')
          console.log(data)
      })
      .catch(err => {
        console.error(err)
      })
  }
}

