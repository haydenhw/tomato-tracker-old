import * as actions from '../actions/indexActions';

const defaultState = {
  taskForm: []
}

export function customForm(state=defaultState, action) {
  switch(action.type) {
    case actions.ADD_TEMP_TASK:
      return {
        ...state,
        taskForm: { tasks: [...state.taskForm.tasks, action.newTask]} 
      };
    case actions.SET_TEMP_TASKS:
      return {
        ...state,
        taskForm: { tasks: action.newTasks } 
      };
    case actions.TOGGLE_SHOULD_DELETE:
      const { tasks } = state.taskForm; 
      
      const newTasks = tasks.map(task => {
        if (task.shortId === action.taskId) {
          const shouldDelete = !task.shouldDelete;
          return Object.assign({}, task, { shouldDelete })
        }
        
        return task;
      })
      
      return {
        ...state,
        taskForm: { tasks: newTasks } 
      };
    default:
      return state;
  }
}
