import React, { Component } from 'react';
import Timer from './Timer';
import TaskList from './TaskList';
import TaskSelect from './TaskSelect';

export default class App extends Component {
  constructor(props) {
    super(props);
    
    const { taskData } = props;
    const firstTaskId = taskData[0].id;
    
     this.state = {
      isTimerActive: false,
      selectedTaskId: firstTaskId,
      timerStartCount: 10,
      tasks: taskData,
    }
  }
  
  incrementTaskTime() {
    const { tasks, selectedTaskId } = this.state;
      const updatedTasks = tasks.map(task => {
        console.log(task.id, selectedTaskId)
        if (selectedTaskId === task.id) {
          const oldProps = task;
          const updatedProp = { recordedTime: task.recordedTime + 1 };
          
          return Object.assign({}, oldProps, updatedProp);
        }
        
        return task;
      })
      console.log(updatedTasks)
      this.setState({ tasks: updatedTasks });
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
          incrementTaskTime={this.incrementTaskTime.bind(this)}
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


