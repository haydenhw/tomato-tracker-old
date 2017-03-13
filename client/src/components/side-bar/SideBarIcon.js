import React, { Component } from 'react';

export default class SideBarIcon extends Component {

  addModuleToState() {
    console.log(this.props.proxyId);
  }

  render() {
    const style = {
      "height": "50px",
      "width": "50px",
      "backgroundColor": "blue"
    }
    
    return (
      <div 
      style={style}
      ref={(module) => { this.selectedModule = module; }} 
      onClick={this.addModuleToState.bind(this)} 
      >
        I am a div
      </div>
  
    );
  }
}