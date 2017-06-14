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
        return Object.assign({}, project, {tasks: action.newTasks})
      });
    case actions.DELETE_TASK:
      return state.mapAndFindById('shortId', action.projectId, (project) => {
        const deleteIndex = project.tasks.findIndex(task => task['shortId'] === action.taskId);
        const newTasks = project.tasks.sliceDelete(deleteIndex);
        
        return Object.assign({}, project, {tasks: newTasks})
      });
    case actions.INCREMENT_TASK_TIME:
      return state.mapAndFindById('shortId', action.projectId, (project) => {
        const newTasks = project.tasks.mapAndFindById('shortId', action.taskId, (task) => {
          return Object.assign({}, task, { recordedTime: task.recordedTime + 1 });
        });
        
        return Object.assign({}, project, {tasks: newTasks});
      });
    default:
    return state;
  }
}

export function projects(state=[], action) {
  switch(action.type) {
    case actions.POST_PROJECT_REQUEST:
      return [
        ...state,
        action.project
      ]
    case actions.POST_PROJECT_SUCCESS:
      return state.mapAndFindById('shortId', action.projectId, (project) => {
        return Object.assign({}, project, {_id: action.databaseId})
      })
    case actions.DELETE_PROJECT:
      return state.sliceDelete(action.index);
    case actions.UPDATE_TASKS:
      return tasks(state, action);
    case actions.DELETE_TASK: 
      return tasks(state, action);
    case actions.INCREMENT_TASK_TIME: 
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