import React, { Component } from 'react';
import Timer from './Timer';
import TaskList from './TaskList';
import TaskSelect from './TaskSelect';

export default class App extends Component {
  constructor(props) {
    super(props);
    
    const { taskData } = props;
     this.state = {
      isTimerActive: false,
      remainingTime: 350,
      selectedTask: null
      tasks: taskData,
    }
  }
  
  render() {
    const { isTimerActive, remainingTime, selectedTask, tasks  } = this.state;
    const taskOptions = tasks.map(task => task.taskName);
    
    return (
      <div className="countdown-timer">
        <TaskSelect options={taskOptions} />
        <Timer seconds={remainingTime} />
        <TaskList tasks={tasks} />
        <button>{isTimerActive ? "Pause" : "Start"}</button>
      </div>
    );
  }
}


