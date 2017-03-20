import React, { Component } from 'react';
import {Layer, Stage, Image} from 'react-konva';
import * as actions from '../actions/indexActions';
import store from '../store';
import collide from '../helper-functions/collide';
import collideFromSideBar from '../helper-functions/collideFromSideBar';

export default class Module extends Component {
    state = {
      image: null
    }
    
    componentDidMount() {
      const image = new window.Image();
      image.src = this.props.image;
      image.onload = () => {
        this.setState({
          image: image
        });
      }
    }
    
    componentDidUpdate() {
      const draggingModule = this.refs.module;
      const stage = draggingModule.getParent().getParent();
      const moduleNodes = stage.get(".module");
      const boardGroup = stage.get(".boardGroup")[0];
      //console.log(stage)
      //console.log(moduleNodes)
      //console.log(boardGroup.getParent().getParent().get(".module"))
      // console.log(collideFromSideBar)
      if (boardGroup) {
        collideFromSideBar(draggingModule, moduleNodes, boardGroup);
      }
      
    }
    
    updatePosition() {
      const module = this.refs.module
      const newPosition = {
        x: module.getX(),
        y: module.getY(),
        index: module.index
      }
      store.dispatch(actions.updateModulePosition(newPosition))
    }
    
    checkBoundaries() {
      const draggingModule = this.refs.module;
      const boardGroup = draggingModule.getParent();
      const moduleNodes = boardGroup.get(".module");
      //console.log(boardGroup.getParent().getParent().get(".module"))
      
      collide(draggingModule, moduleNodes);
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
              onDragEnd={this.updatePosition.bind(this)}
              onDragMove={this.checkBoundaries.bind(this)}
              
            />
        );
    }
}