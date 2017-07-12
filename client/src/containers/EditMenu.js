import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import Dropdown from '../components/Dropdown';
import DropdownTrigger from '../components/DropdownTrigger';
import DropdownContent from '../components/DropdownContent';

export default class EditMenu extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isActive: false,
    };

    this.handleBodyClick = this.handleBodyClick.bind(this);
  }
  
  componentDidUpdate(prevProps, prevState) {
    
    if (prevState.isActive === true && this.state.isActive === false) {
      document.body.removeEventListener('click', this.handleBodyClick);
    }
  }
  
  bindBodyClickHandler() {
    document.body.addEventListener('click', this.handleBodyClick);
  }

  handleClick = (evt) => { evt.stopPropagation();
    // console.log(this.props.isActive)
    const { onMenuClick, parentId } = this.props;
    this.bindBodyClickHandler();  
    
    if (onMenuClick) {
      onMenuClick(parentId);  
      return null; 
    }
      
    const { isActive } = this.state;
    this.setState({ isActive: !isActive });
  }
  
  handleBodyClick(evt) {
    const { onMenuClick } = this.props;
    const { isActive } = this.state;
    const targetClassName = evt.target.className;
    
    if (
      targetClassName !== 'task-select option' &&
      targetClassName !==  'task-select option-item'
    ) {
      if (onMenuClick) { 
        onMenuClick(null);
      } else {
        this.setState({ isActive: !isActive } );
      }
      document.body.removeEventListener('click', this.handleBodyClick);
    }
  }
  

  render() {
    const { children, className, handleClick, isActive, parentId } = this.props;
    
    return ( 
      <Dropdown ref={(node) => { this.dropdown = node }} className={className}> 
        <div className="dropdown-wrapper">
          <DropdownTrigger handleClick={this.handleClick}>
            <div className="edit-menu-icon icon-edit"></div>
          </DropdownTrigger>
          <DropdownContent 
            isActive={(isActive !== null) && (isActive !== undefined) ? isActive : this.state.isActive}
          >
            {children}
          </DropdownContent>
        </div>
      </Dropdown>
    );
  }
}

