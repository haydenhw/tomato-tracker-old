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
    case actions.ADD_TASK:
      const {taskName, projectId } = action;
      
      return state.mapAndFindById('shortId', projectId, (project) => {
        const newTask = {
          taskName,
          shortId: shortid.generate(),
          recordedTime: 0,
        }
        
        const newTasks = [...project.tasks, newTask];
        
        return Object.assign({}, project, {tasks: newTasks})
    });
    
    default:
    return state;
  }
}

export function projects(state=getProjects(), action) {
  switch(action.type) {
    case actions.ADD_TASK:
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