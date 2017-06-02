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
      timerStartCount: 2,
      tasks: taskData,
    }
  }
  
  incrementTaskTime() {
    
  }
  
  toggleIsTimerActive() {
    const { isTimerActive } = this.state;
    this.setState({isTimerActive: !isTimerActive})
  }
  
  handleTaskChange(evt){
    const selectedTaskId = evt.nativeEvent.target.value;
    this.setState({ selectedTaskId: selectedTaskId });
  }
  
  render() {
    const { 
      isTimerActive,
      remainingTime,
      selectedTask,
      tasks,
      timerStartCount,
    } = this.state;
    
    return (
      <div className="countdown-timer">
        <TaskSelect handleChange={this.handleTaskChange.bind(this)} tasks={tasks} />
        <Timer 
          isTimerActive={isTimerActive} 
          toggleIsTimerActive={this.toggleIsTimerActive.bind(this)} 
          startCount={timerStartCount}
        />
        <TaskList tasks={tasks} />
        <button onClick={this.toggleIsTimerActive.bind(this)}>Add New Project</button>
      </div>
    );
  }
}


