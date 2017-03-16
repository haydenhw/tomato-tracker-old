import React, { Component } from 'react';
import * as actions from '../../actions/indexActions';
import store from '../../store';
export default class SideBarIcon extends Component {

  render() {
    const style = {
      "height": "30px",
      "width": "30px",
      "backgroundImage": `url(${this.props.iconImage})`,
      "backgroundSize": "contain",
      "margin": "0 auto",
      "marginBottom": "10px"
    }
    
    return (
      <div 
      style={style}
      ref={(module) => { this.selectedModule = module; }} 
      onMouseMove={ this.props.toggleDraggingToBoard } 
      onMouseDown={ () => store.dispatch(actions.mouseDownOnIcon(true)) }
      onMouseOut={ () => store.dispatch(actions.mouseDownOnIcon(false)) }
      
    />
    );
  }
}