import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import TaskSelect from '../containers/TaskSelect';
import FormModal from '../components/FormModal';
import List from '../components/List';
import Task from '../components/Task';
import Timer from './Timer';

export default class TimeTracker extends Component {
  constructor(props) {
    super(props);
    
    const { tasks } = this.props;
    const firstTaskId = tasks.length > 0 ? tasks[0].shortId : null;
    
     this.state = {
      isTimerActive: false,
      shouldRenderModal: false,
      selectedTaskId: null,
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
    const { tasks } = this.props;
    const { selectedTaskId } = this.state;
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
    const { tasks } = this.props;
    
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
  
  handleTaskChange(taskId){
    this.setState({ selectedTaskId: taskId });
  }
  
  renderTask (task){
    return <Task className="task" key={shortid.generate()} taskData={task} />
  } 
 
  render() {
    const { tasks } = this.props;
    
    const { 
      isTimerActive,
      selectedTaskId,
      shouldRenderModal,
      timerStartCount,
    } = this.state;
    
    
    const selectedTask = tasks.find(task => task.shortId === selectedTaskId);
    
    return (
      <div className="countdown-timer">
        <TaskSelect updateSelectedTask={this.handleTaskChange.bind(this)} tasks={tasks} selectedTask={selectedTask} />
        <Timer 
          incrementTaskTime={this.incrementTaskTime.bind(this)}
          isTimerActive={isTimerActive} 
          toggleIsTimerActive={this.toggleIsTimerActive.bind(this)} 
          startCount={timerStartCount}
        />
        <List className="task-list" items={tasks} renderItem={this.renderTask}/>
        <button onClick={this.toggleShouldRenderModal.bind(this)}> New Task</button>
        <FormModal
          form="ADD_PROJECT"
          handleCloseButtonClick={this.toggleShouldRenderModal.bind(this)}
          hanldeFormSubmit={this.handleAddTaskSubmit.bind(this)}
          shouldRenderModal={shouldRenderModal}
        /> 
      </div>
    );
  }
}

TimeTracker.propTypes = {
  tasks: PropTypes.array
}