import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import Dropdown from '../components/Dropdown';
import DropdownTrigger from '../components/DropdownTrigger';
import DropdownContent from '../components/DropdownContent';

export default class EditMenu extends Component {
  constructor() {
    super();

    this.state = {
      isActive: false,
    };

    this.handleBodyClick = this.handleBodyClick.bind(this);
    this.toggleIsActive = this.toggleIsActive.bind(this);
  }
  
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.isActive === true && this.state.isActive === false) {
      document.body.removeEventListener('click', this.handleBodyClick);
    }
  }

  toggleIsActive(e) {
    e.stopPropagation();
    
    const { isActive } = this.state;
    
    document.body.addEventListener('click', this.handleBodyClick);
    this.setState({ isActive: !isActive });
  }
  
  handleBodyClick (evt) {
    const targetClassName = evt.target.className;
    
    if (
      targetClassName !== 'task-select option' &&
      targetClassName !==  'task-select option-item'
    ) {
      this.setState({ isActive: false });
    }
  }
  

  render() {
    const { isActive } = this.state;
    const { children, className } = this.props;

    return (
      <Dropdown className={className}>
        <div className="dropdown-wrapper">
          <DropdownTrigger handleClick={this.toggleIsActive}>
            <FontAwesome className="edit-menu-icon fa-pencil-square-o" name="fa-pencil-square-o" />
          </DropdownTrigger>
          <DropdownContent isActive={isActive}>
            {children}
          </DropdownContent>
        </div>
      </Dropdown>
    );
  }
}

