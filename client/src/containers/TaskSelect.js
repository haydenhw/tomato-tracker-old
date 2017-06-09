import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import Dropdown from '../components/Dropdown';
import DropdownTrigger from '../components/DropdownTrigger';
import DropdownContent from '../components/DropdownContent';

export default class TaskSelect extends Component {
  constructor() {
    super();

    this.state = {
      isActive: false,
    };

    this.toggleIsActive = this.toggleIsActive.bind(this);
  }
  
  toggleIsActive() {
    const { isActive } = this.state;

    this.setState({ isActive: !isActive });
  }

  
  handleOptionClick = (taskId) => () => {
    const { updateSelectedTask } = this.props;
    
    updateSelectedTask(taskId);
    this.toggleIsActive();
  }
  

  renderOptions() {
    const { tasks } = this.props;
    
    return tasks.map(task => {
      return (
        <li key={shortid.generate()} className='task-option' onClick={this.handleOptionClick(task.shortId)}>
          <span className='task-option-text'>{task.taskName}</span>
        </li>
      );
    });
  }

  render() {
    const { isActive } = this.state;
    const { selectedTask } = this.props;
    
    const selectedTaskName = selectedTask && selectedTask.taskName;
    
    return (
      <Dropdown className="task-select">
        <div className="dropdown-wrapper">
          <DropdownTrigger handleClick={this.toggleIsActive}>
            <span className="selected-task">{selectedTaskName || "Click to select a task..."}</span>
          </DropdownTrigger>
          <DropdownContent isActive={isActive}>
            {this.renderOptions()}
          </DropdownContent>
        </div>
      </Dropdown>
    );
  }
}

TaskSelect.propTypes = {
  tasks: PropTypes.array.isRequired
}

