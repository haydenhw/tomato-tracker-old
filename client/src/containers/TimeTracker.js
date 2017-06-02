import React, { Component } from 'react';
import shortid from 'shortid';

import FormModal from '../components/FormModal';
import TaskList from '../components/TaskList';
import TaskSelect from '../components/TaskSelect';
import Timer from './Timer';

export default class TimeTracker extends Component {
  constructor(props) {
    super(props);
    
    const { tasks } = props;
    
    const firstTaskId = tasks.length > 0 ? tasks[0].id : null;
    
     this.state = {
      isTimerActive: false,
      shouldRenderModal: true,
      selectedTaskId: firstTaskId,
      timerStartCount: 10,
      tasks: tasks,
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
  
  toggleShouldRenderModal(modalType) {
    const { shouldRenderModal } = this.state;
    
    let newModalState = { shouldRenderModal: !shouldRenderModal};
    
    if (modalType) { 
      const updatedModalType = { modalType: modalType};
      newModalState = Object.assign(newModalState, updatedModalType);
    }
    
    this.setState(newModalState);
    console.log(this.state.shouldRenderModal)
  }
  
  handleAddTaskSubmit(formValue) {
    const { tasks } = this.state;
    
    const newTask = {
      taskName: formValue.name,
      recordedTime: 0,
      id: shortid.generate()
    }
    
    const newTasks = [...tasks, newTask]
    console.log(newTasks)
    this.setState({tasks: newTasks});
    this.setState({shouldRenderModal: false});
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
      shouldRenderModal,
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
        <button onClick={this.toggleShouldRenderModal.bind(this)}> New Task</button>
        <FormModal 
          handleCloseButtonClick={this.toggleShouldRenderModal.bind(this)}
          hanldeFormSubmit={this.handleAddTaskSubmit.bind(this)}
          shouldRenderModal={shouldRenderModal}
        /> 
      </div>
    );
  }
}
