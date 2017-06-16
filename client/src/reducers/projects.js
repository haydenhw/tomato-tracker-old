import  * as actions from '../actions/indexActions'
import shortid from 'shortid';

Array.prototype.mapAndFindById = function (idKey, id, callback) {
  return this.map((element, index) => {
    if (element[idKey] === id) {
      return callback(element, index)
    }
    
    return element;
  })
}

Array.prototype.sliceDelete = function(index) {
  return [
    ...this.slice(0, index),
    ...this.slice(index + 1)
  ]
}

function tasks(state, action) {
  switch(action.type) {
    case actions.UPDATE_TASKS:
      return state.mapAndFindById('shortId', action.projectId, (project) => {
        return Object.assign({}, project, { tasks: action.newTasks })
      });
    case actions.POST_TASK_SUCCESS:
      return state.mapAndFindById('_id', action.projectId, (project) => {
        const newTasks = project.tasks.mapAndFindById('shortId', action.taskId, (task) => {
          return Object.assign({}, task, { _id: action.databaseId });
        });
        
        return Object.assign({}, project, { tasks: newTasks });
      });
    case actions.DELETE_TASK_REQUEST:
      return state.mapAndFindById('shortId', action.projectId, (project) => {
        const deleteIndex = project.tasks.findIndex(task => task['shortId'] === action.taskId);
        const newTasks = project.tasks.sliceDelete(deleteIndex);
        
        return Object.assign({}, project, { tasks: newTasks })
      });
    case actions.INCREMENT_TASK_TIME:
      return state.mapAndFindById('shortId', action.projectId, (project) => {
        const newTasks = project.tasks.mapAndFindById('shortId', action.taskId, (task) => {
          return Object.assign({}, task, { recordedTime: task.recordedTime + 1 });
        });
        
        return Object.assign({}, project, { tasks: newTasks });
      });
    default:
    return state;
  }
}

export function projects(state=[], action) {
  switch(action.type) {
    case actions.FETCH_PROJECTS_SUCCESS:
      return action.projects;
    case actions.POST_PROJECT_REQUEST:
      return [
        ...state,
        action.project
      ]
    case actions.POST_PROJECT_SUCCESS:
      return state.mapAndFindById('shortId', action.projectId, (project) => {
        return Object.assign({}, project, { _id: action.databaseId })
      })
    case actions.DELETE_PROJECT_REQUEST:
      const projectIndex = state.findIndex(project => project.shortId === action.project.shortId);
      return state.sliceDelete(projectIndex);
    case actions.UPDATE_TASKS:
      return tasks(state, action);
    case actions.POST_TASK_SUCCESS:
      return tasks(state,action);
    case actions.DELETE_TASK_REQUEST: 
      return tasks(state, action);
    case actions.INCREMENT_TASK_TIME: 
      return tasks(state, action);
    default:
    return state;
  }
}