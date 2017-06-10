import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import Dropdown from '../components/Dropdown';
import DropdownTrigger from '../components/DropdownTrigger';
import DropdownContent from '../components/DropdownContent';

export default class NavDropdown extends Component {
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

  render() {
    const { isActive } = this.state;
    const { children, className } = this.props;

    return (
      <Dropdown className={className}>
        <div className="dropdown-wrapper">
          <DropdownTrigger handleClick={this.toggleIsActive}>
            <FontAwesome className="fa-pencil-square-o" name="fa-pencil-square-o" />
          </DropdownTrigger>
          <DropdownContent isActive={isActive}>
            {children}
          </DropdownContent>
        </div>
      </Dropdown>
    );
  }
}

