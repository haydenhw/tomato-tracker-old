import React, { Component } from 'react';
import shortid from 'shortid';

import FormModal from '../components/FormModal';
import List from '../components/List';
import Task from '../components/Task';
import TaskSelect from '../components/TaskSelect';
import Timer from './Timer';

export default class TimeTracker extends Component {
  constructor(props) {
    super(props);
    
    const { tasks } = props;
    const firstTaskId = tasks.length > 0 ? tasks[0].id : null;
    
     this.state = {
      isTimerActive: false,
      shouldRenderModal: false,
      selectedTaskId: firstTaskId,
      timerStartCount: 10,
      tasks: tasks,
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.tasks !== this.props.tasks) {
      this.setState({
        tasks: nextProps.tasks,
        selectedTaskId: nextProps.tasks.length > 0 ? nextProps.tasks[0].id : null
      })
    }
  }
  
  incrementTaskTime() {
    const { tasks, selectedTaskId } = this.state;
      const updatedTasks = tasks.map(task => {
        if (selectedTaskId === task.id) {
          const oldProps = task;
          const updatedProp = { recordedTime: task.recordedTime + 1 };
          
          return Object.assign({}, oldProps, updatedProp);
        }
        
        return task;
      })
      // console.log(updatedTasks[0])
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
  
  renderTask (task){
    return <Task className="task" key={shortid.generate()} taskData={task} />
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
        <List className="task-list" items={tasks} renderItem={this.renderTask}/>
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
