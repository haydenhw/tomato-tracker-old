import React, { Component } from 'react';
import * as actions from '../../actions/indexActions';
import store from '../../store';
export default class SideBarIcon extends Component {
  
  handleMouseMovement() {
    this.props.toggleDraggingToBoard();
    store.dispatch(actions.changeDraggingModule(this.props.moduleData));
  }

  render() {
    const style = {
      "height": "30px",
      "width": "30px",
      "backgroundImage": `url(${this.props.moduleData.image})`,
      "backgroundSize": "contain",
      "margin": "0 auto",
      "marginBottom": "10px"
    }
    
    return (
      <div 
      style={style}
      ref={(module) => { this.selectedModule = module; }} 
      onMouseMove={ this.handleMouseMovement.bind(this) } 
      onMouseDown={ () => store.dispatch(actions.mouseDownOnIcon(true)) }
      onMouseOut={ () => store.dispatch(actions.mouseDownOnIcon(false)) }
      
    />
    );
  }
}