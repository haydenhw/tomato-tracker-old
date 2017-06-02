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
      selectedTaskId: null,
      startCount: 3,
      tasks: taskData,
    }
  }
  
  handleTaskChange(evt){
    const selectedTaskId = evt.nativeEvent.target.value;
    this.setState({ selectedTaskId: selectedTaskId });
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
        <TaskSelect handleChange={this.handleTaskChange.bind(this)} options={taskOptions} />
        <Timer 
          isTimerActive={isTimerActive} 
          toggleIsTimerActive={this.toggleIsTimerActive.bind(this)} 
          startCount={3}
        />
        <TaskList tasks={tasks} />
        <button onClick={this.toggleIsTimerActive.bind(this)}>Add New Project</button>
      </div>
    );
  }
}


