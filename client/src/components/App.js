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
      selectedTask: null,
      tasks: taskData,
    }
  }
  
  toggleIsTimerActive() {
    const { isTimerActive } = this.state;
    this.setState({isTimerActive: !isTimerActive})
  }
  
  render() {
    const { isTimerActive, remainingTime, selectedTask, tasks  } = this.state;
    const taskOptions = tasks.map(task => task.taskName);
    
    return (
      <div className="countdown-timer">
        <TaskSelect options={taskOptions} />
        <Timer isTimerActive={isTimerActive} handleStartButtonClick={this.toggleIsTimerActive.bind(this)}/>
        <TaskList tasks={tasks} />
        <button onClick={this.toggleIsTimerActive.bind(this)}>Add New Project</button>
      </div>
    );
  }
}


