import React, { Component } from 'react';
import Modal from './Modal';
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
      shouldRenderModal: false,
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
        <Modal 
          handleCloseButtonClick={this.toggleShouldRenderModal.bind(this)}
          rightButtonText="Submit"
          shouldRender={shouldRenderModal}
          text={"Add a new project"}
        >
          <form>
            <input type="text"/>
            <input type="submit"/>
          </form>
        </Modal> 
      </div>
    );
  }
}


