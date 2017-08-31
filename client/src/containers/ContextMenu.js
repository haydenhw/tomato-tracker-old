import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

import { changeActiveContextMenu } from '../actions/indexActions';
import Dropdown from '../components/Dropdown';
import DropdownTrigger from '../components/DropdownTrigger';
import DropdownContent from '../components/DropdownContent';

class ContextMenu extends Component {
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

  handleClick = (evt) => { 
    evt.stopPropagation();
    
    const {  onMenuClick, parentId } = this.props;
    
    onMenuClick
      ? onMenuClick(parentId)
      : this.setState({ isActive: true });
    
    this.bindBodyClickHandler();  
  }
  
  handleBodyClick(evt) {
    const {  onMenuClick } = this.props;
    const targetClassName = evt.target.className;
    
    if (
      targetClassName !== 'task-select option' &&
      targetClassName !==  'task-select option-item'
    ) {
      onMenuClick 
        ? onMenuClick(null)
        : this.setState({ isActive: false });
        
      document.body.removeEventListener('click', this.handleBodyClick);
    }
  }
  

  render() {
    const { activeContextMenuParentId, children, className, parentId } = this.props;
    const { isActive } = this.state;
    
    return ( 
      <Dropdown className={className}> 
        <div className="dropdown-wrapper">
          <DropdownTrigger handleClick={this.handleClick}>
            <div className="context-menu-icon icon-dots-three-horizontal"></div>
          </DropdownTrigger>
          <DropdownContent isActive={activeContextMenuParentId ? activeContextMenuParentId === parentId : isActive}>
            {children}
          </DropdownContent>
        </div>
      </Dropdown>
    );
  }
}

const mapStateToProps = state => {
  const { editMenu } = state;
  
  return {
    activeContextMenuParentId: editMenu.activeParentId
  } 
}

export default connect(mapStateToProps, { changeActiveContextMenu })(ContextMenu);