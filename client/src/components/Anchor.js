import React, { Component } from 'react';
import {Circle} from 'react-konva';
import * as actions from '../actions/action-index';
import store from '../store';


export default class Anchor extends Component {
  
  update () {
    const activeAnchor = this.refs.anchor
    const group = this.refs.anchor.getParent();
    
    const topLeft = group.get('.topLeft')[0];
    const topRight = group.get('.topRight')[0];
    const bottomRight = group.get('.bottomRight')[0];
    const bottomLeft = group.get('.bottomLeft')[0];
    const board = group.get('.board')[0];
    const anchorX = activeAnchor.getX();
    const anchorY = activeAnchor.getY();
    console.log(anchorX, anchorY)
    // update anchor positions
    switch (activeAnchor.getName()) {
        case 'topLeft':
            topRight.setY(anchorY);
            bottomLeft.setX(anchorX);
            break;
        case 'topRight':
            topLeft.setY(anchorY);
            bottomRight.setX(anchorX);
            break;
        case 'bottomRight':
            bottomLeft.setY(anchorY);
            topRight.setX(anchorX);
            break;
        case 'bottomLeft':
            bottomRight.setY(anchorY);
            topLeft.setX(anchorX);
            break;
    }
    board.position(topLeft.position());
    
    const width = topRight.getX() - topLeft.getX();
    const height = bottomLeft.getY() - topLeft.getY();
    //console.log(width, height)
  
    if(width && height) {
      board.width(width);
      board.height(height);
      store.dispatch(actions.updateBoardDimensions(
        {width: width, height: height})
      );
    }
  }
  
  moveToTop() {
    const group = this.refs.anchor.getParent()
    group.setDraggable(false);
    this.refs.anchor.moveToTop();
  }
  
  draggableOn() {
    const group = this.refs.anchor.getParent()
    group.setDraggable(true);
  }
  
  render() {
    return <Circle
      ref="anchor"
      x={this.props.x}
      y={this.props.y}
      stroke='#666'
      fill='#ddd'
      strokeWidth="2"
      radius="8"
      name={this.props.name}
      draggable="true"
      dragOnTop="false"
      onMouseDown={this.moveToTop.bind(this)}
      onDragMove={this.update.bind(this)}
      onDragEnd={this.draggableOn.bind(this)} 
    />
            
  }
}