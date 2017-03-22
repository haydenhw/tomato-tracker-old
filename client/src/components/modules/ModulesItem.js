import React, { Component } from 'react';
import {Layer, Stage, Image} from 'react-konva';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import enforceRules from 'helpers/collide';
//import checkBounds from 'helpers/checkBounds';


export default class ModulesItem extends Component {
    state = {
      image: null
    }
    
    checkCollision() {
      const draggingModuleNode = this.refs.module;
      const boardGroup = draggingModuleNode.getParent();
      const moduleNodes = boardGroup.get(".module");
      const boardNode = boardGroup.getParent().get(".board")[0];
      
      const redStroke = node => node.attrs.stroke = "red";
      const nullStroke = node => node.attrs.stroke = null;
      
      enforceRules(moduleNodes, boardNode, redStroke, nullStroke);
    }
    
    /*checkBoundaries(topCollidingNode) {
      const draggingModuleNode = this.refs.module;
      const boardGroup = draggingModuleNode.getParent().getParent();
      
      checkBounds(draggingModuleNode, boardGroup, topCollidingNode);
    }*/
    
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
