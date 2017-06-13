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
      console.log(state.mapAndFindById('shortId', action.projectId, (project) => {
        return Object.assign({}, project, {tasks: action.newTasks})
      }))
      return state.mapAndFindById('shortId', action.projectId, (project) => {
        return Object.assign({}, project, {tasks: action.newTasks})
      });
    case actions.DELETE_TASK:
      
      return state.mapAndFindById('shortId', action.projectId, (project) => {
        const deleteIndex = project.tasks.findIndex(task => task['shortId'] === action.taskId);
        const newTasks = project.tasks.sliceDelete(deleteIndex);
        
        return Object.assign({}, project, {tasks: newTasks})
      });
      
    
    default:
    return state;
  }
}

export function projects(state=getProjects(), action) {
  switch(action.type) {
    case actions.ADD_PROJECT:
      return [
        ...state,
        action.project
      ]
    case actions.DELETE_PROJECT:
      return state.sliceDelete(action.index);
    case actions.CHANGE_SELECTED_PROJECT:
      return action.projectId;
    case actions.UPDATE_TASKS:
      return tasks(state, action);
    case actions.DELETE_TASK: 
      return tasks(state, action);
    default:
    return state;
  }
}


function getProjects() {
  return ([
    {
      projectName: "Node Capstone",
      shortId: '123',
      tasks: [
        {
          taskName: 'user flows',
          recordedTime: Math.random() * 100,
          shortId: '111'
        },
        {
          taskName: 'mock up',
          recordedTime: Math.random() * 100,
          shortId: shortid.generate()
        },
        {
          taskName: 'mvp',
          recordedTime: Math.random() * 100,
          shortId: shortid.generate()
        },
      ]
    },
    {
      projectName: "React Capstone",
      shortId: '456',
      tasks: [
        {
          taskName: 'user flows',
          recordedTime: Math.random() * 100,
          shortId: shortid.generate()
        },
        {
          taskName: 'mock up',
          recordedTime: Math.random() * 100,
          shortId: shortid.generate()
        },
        {
          taskName: 'mvp',
          recordedTime: Math.random() * 100,
          shortd: shortid.generate()
        },
      ]
    },
  ])
}