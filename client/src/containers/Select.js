import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import Dropdown from '../components/Dropdown';
import DropdownTrigger from '../components/DropdownTrigger';
import DropdownContent from '../components/DropdownContent';

export default class Select extends Component {
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
  
  toggleIsActive() {
    const { isActive } = this.state;
    
    document.body.addEventListener('click', this.handleBodyClick);
    this.setState({ isActive: !isActive });
  }
  
  handleBodyClick (evt) {
    const targetClassNames = evt.target.className.split(' ');
    
    if (
      targetClassNames.indexOf('option') === -1 &&
      targetClassNames.indexOf('option-item') === -1
    ) {
      this.setState({ isActive: false });
    }
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
  
  renderTest() {
    if (this.state.isActive) {
      return <div className='trans-test'></div>
    }
    
    return null;
  }
  
  render() {
    const { isActive } = this.state;
    const { className } = this.props;
    
    return (
      <Dropdown className={`${className || ""} select`}>
        <div className="dropdown-wrapper">
          <DropdownTrigger handleClick={this.toggleIsActive}>
            {this.props.children}
          </DropdownTrigger>
          <DropdownContent isActive={isActive}>
            {this.renderOptions()}
          </DropdownContent>
        </div>
      </Dropdown>
    );
  }
}

Select.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
}

