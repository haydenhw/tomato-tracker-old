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

  
  handleOptionClick = (optionId) => () => {
    const { handleOptionClick } = this.props;
    
    handleOptionClick(optionId);
    this.toggleIsActive();
  }
  

  renderOptions() {
    const { items, className } = this.props;
    
    return items.map(item=> {
      return (
        <li key={shortid.generate()} className={`${className || ""} option`} onClick={this.handleOptionClick(item.id)}>
          <span className={`${className || ""} option-item`}>{item.name}</span>
        </li>
      );
    });
  }

  render() {
    const { isActive } = this.state;
    const { className, selectedOption } = this.props;
    
    
    return (
      <Dropdown className={`${className || ""} select`}>
        <div className="dropdown-wrapper">
          <DropdownTrigger handleClick={this.toggleIsActive}>
            <span className="selected-task">{}</span>
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
  className: PropTypes.string
  items: PropTypes.array.isRequired,
}

