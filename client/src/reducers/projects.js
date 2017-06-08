import  * as actions from '../actions/indexActions'
import shortid from 'shortid';
console.log(actions)


export function projects(state=getProjects(), action) {
  switch(action.type) {
    case actions.ADD_TASK:
      const { projectId, taskName } = action;
      const newTask = {
        taskName,
        shortId: shortid.generate(),
        recordedTime: 0,
      }
      
      const projectToUpdate = state.find((project) => project.shortId === projectId);
      const newProject = Object.assign({}, projectToUpdate, { tasks: [...projectToUpdate.tasks, newTask]} );
      
      console.log(newProject.tasks)
      return state
      
      default:
      return state
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