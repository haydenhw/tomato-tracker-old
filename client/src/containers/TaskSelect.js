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
  

  renderOptions() {
    const { tasks, handleOptionClick } = this.props;
    console.log(handleOptionClick);
    return tasks.map(task => {
      return (
        <li key={shortid.generate()} className='task-option' onClick={handleOptionClick}>
          <span className='task-option-text'>{task.taskName}</span>
        </li>
      );
    });
  }

  toggleIsActive() {
    const { isActive } = this.state;

    this.setState({ isActive: !isActive });
  }

  render() {
    const { isActive } = this.state;
    const { selectedTask } = this.props;
    
    const selectedTaskName = selectedTask && selectedTask.name;
    
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

