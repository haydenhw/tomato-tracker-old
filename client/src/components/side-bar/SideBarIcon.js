import React, { Component } from 'react';
import * as actions from '../../actions/indexActions';
import store from '../../store';
export default class SideBarIcon extends Component {
  
  handleMouseMovement() {
    
    this.props.toggleDraggingToBoard();
    
  }
  
  handleMouseDown(evt) {
    /*console.log(evt.clientX)
    const newModule = this.props.moduleData;
    newModule.x = -300;
    newModule.y = 50;*/
    
    store.dispatch(actions.mouseDownOnIcon(true))
    store.dispatch(actions.changeDraggingModule(this.props.moduleData));
    //store.dispatch(actions.pushToCurrentProjectModules(newModule));
    
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
      onMouseDown={ this.handleMouseDown.bind(this) }
      onMouseOut={ () => store.dispatch(actions.mouseDownOnIcon(false)) }
      
    />
    );
  }
}