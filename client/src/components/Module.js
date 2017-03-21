import React, { Component } from 'react';
import {Layer, Stage, Image} from 'react-konva';
import * as actions from '../actions/indexActions';
import store from '../store';
import collide from '../helper-functions/collide';

export default class Module extends Component {
    state = {
      image: null
    }
    
    checkCollision() {
      const draggingModule = this.refs.module;
      const boardGroup = draggingModule.getParent();
      const moduleNodes = boardGroup.get(".module");
      
      collide(draggingModule, moduleNodes);
    }
    
    componentDidMount() {
      
      const image = new window.Image();
      image.src = this.props.image;
      image.onload = () => {
        this.setState({
          image: image
        });
      }
      this.checkCollision();
      
    }
    
    handleDragMove() {
      this.checkCollision();
    
    }
    
    handleDragEnd() {
      const module = this.refs.module
      const newPosition = {
        x: module.getX(),
        y: module.getY(),
        index: module.index
      }
      store.dispatch(actions.updateModulePosition(newPosition))
    }
    
    
    
    render() {
      const { x, y, height, width, index } = this.props;
        return (
            <Image
              ref="module"
              name="module"
              index={index}
              x={x}
              y={y}
              height={height}
              width={width}
              image={this.state.image}
              icon={this.state.image}
              draggable="true"
              onDragEnd={this.handleDragEnd.bind(this)}
              onDragMove={this.handleDragMove.bind(this)}
              
            />
        );
    }
}