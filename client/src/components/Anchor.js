import React, { Component } from 'react';
import {Circle} from 'react-konva';

export default class Anchor extends Component {
  
  
  
  render() {
    return <Circle
      x= {this.props.x}
      y= {this.props.y}
      stroke= '#666'
      fill= '#ddd'
      strokeWidth= "2"
      radius= "8"
      name= {this.props.name}
      draggable= "true"
      dragOnTop= "false"
    />
            
  }
}