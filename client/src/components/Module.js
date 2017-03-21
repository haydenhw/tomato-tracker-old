import React, { Component } from 'react';
import {Layer, Stage, Image} from 'react-konva';
import * as actions from '../actions/indexActions';
import store from '../store';
import collide from '../helper-functions/collide';
import checkBounds from '../helper-functions/checkBounds';


export default class Module extends Component {
    state = {
      image: null,
      //isStrokeRed: true
    }
    
    checkCollision() {
      // console.log('hello')
      const draggingModuleNode = this.refs.module;
      const boardGroup = draggingModuleNode.getParent();
      const moduleNodes = boardGroup.get(".module");
      console.log(collide(draggingModuleNode, moduleNodes));
      return collide(draggingModuleNode, moduleNodes);
    }
    
    checkBoundaries(topCollidingNode) {
      const draggingModuleNode = this.refs.module;
      const boardGroup = draggingModuleNode.getParent().getParent();
      
      checkBounds(draggingModuleNode, boardGroup, topCollidingNode);
    }
    
    componentDidMount() {
      
      const image = new window.Image();
      image.src = this.props.image;
      image.onload = () => {
        this.setState({
          image: image
        });
      }
      
      
      const topCollidingNode = this.checkCollision();
      console.log(/*this.checkCollision(),*/ topCollidingNode)
      
      this.checkBoundaries(topCollidingNode);
      //this.setState({isStrokeRed: !this.state.isStrokeRed})
    }
    
    handleDragMove() {
      const topCollidingNode = this.checkCollision();
      this.checkBoundaries(topCollidingNode);
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
              //stroke={this.state.isStrokeRed ? 'red' : null}
              draggable="true"
              onDragEnd={this.handleDragEnd.bind(this)}
              onDragMove={this.handleDragMove.bind(this)}
              
            />
        );
    }
}