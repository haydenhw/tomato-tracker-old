import React, { Component } from 'react';
import { ContextMenu, MenuItem } from "react-contextmenu";

export default class DesignToolContextMenu extends Component {
  
  componentDidMount() {
    console.log('mounted')
  }
  
  deleteModule() {
    
  }
  render() {
    //console.log('rendered')
    return (
      <ContextMenu id={'SIMPLE'}>
          <MenuItem onClick={this.deleteModule.bind(this)} data={{action: 'Removed'}}>Delete</MenuItem>
      </ContextMenu>
    );
  }
}