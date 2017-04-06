import React, { Component } from 'react';
import { Rect, Group, Image, Text } from 'react-konva';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import enforceRules from 'helpers/enforceRules';
import getPerimeterSide from 'helpers/getPerimeterSide';
import bindToPerimeter from 'helpers/bindToPerimeter';


export default class ModulesItem extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      image: null
    }
  }
  
  componentDidUpdate(prevProps, prevState) {
    // forces module image to update after a module is deleted
    if (prevState.image) {
      const prevImageSrc = prevState.image.getAttribute("src");
      
      if (prevImageSrc !== this.props.imageSrc) {
        const image = new window.Image();
        image.src = this.props.image;
        image.onload = () => {
          this.setState({
            image: image
          });
        }
      }
    }
  }
  
  componentDidMount() {
    if (this.props.imageSrc) {
      const image = new window.Image();
      image.src = this.props.imageSrc;
      image.onload = () => {
        this.setState({
          image: image
      });
    }
  }
    
  this.highlightRuleBreakingMoudles();
  }
  
  highlightRuleBreakingMoudles() {
    
    const draggingModuleNode = this.refs.moduleGroup;
    const boardGroup = draggingModuleNode.getParent();
    const moduleNodes = boardGroup.get(".moduleGroup");
    const boardNode = boardGroup.getParent().get(".board")[0];
    
    const addRedStroke = node => {
      node.attrs.name === "moduleGroup" 
        ? node.get(".moduleBorder")[0].attrs.stroke = "red"
        : node.attrs.stroke = "red";
      
    }
    
    const removeRedStroke = node => {
      node.attrs.name === "moduleGroup" 
        ? node.get(".moduleBorder")[0].attrs.stroke = "black"
        : node.attrs.stroke = null
    }
    
    enforceRules(moduleNodes, boardNode, addRedStroke, removeRedStroke);
  }
  
  handleMouseOver() {
    store.dispatch(actions.updateSelectedModule(this.props));
    store.dispatch(actions.toggleIsMouseOverModule(true));
  }
  
  handleMouseOut() {
    store.dispatch(actions.toggleIsMouseOverModule(false));
  }
  
  bindToPerimeter (coordinateData) {
  const cd = coordinateData;
   
   switch(cd.boundToSide) {
    case "bottom":
      return {
        x: cd.moduleX,
        y: cd.boardHeight - cd.moduleHeight
      }
      break;
    case "left":
      return {
        x: 0 + 0.5 * (cd.moduleHeight - cd.moduleWidth),
        y: cd.moduleY
      }
      break;
    case "top":
      return {
        x: cd.moduleX,
        y: 0
      }
      break;
    case "right":
      return {
         x: cd.boardWidth - 0.5 * (cd.moduleHeight + cd.moduleWidth),
         y: cd.moduleY
      }
      break;
   }
 }
  
  handleDragMove() {
    const { boundToSideIndex } = this.props;
    
    if(!isNaN(boundToSideIndex)){
      const module =  this.refs.moduleGroup;
      const board = module
        .getParent()
        .getParent()
        .get(".board")[0]
      
      const coordinateData = {
        boundToSide: getPerimeterSide(boundToSideIndex),
        moduleX: module.attrs.x,
        moduleY: module.attrs.y,
        moduleWidth: module.attrs.width,
        moduleHeight: module.attrs.height, 
        boardWidth: board.attrs.width,
        boardHeight: board.attrs.height
      }
    
      module.attrs.x = this.bindToPerimeter(coordinateData).x;
      module.attrs.y = this.bindToPerimeter(coordinateData).y;
    }
    this.highlightRuleBreakingMoudles();
  }
  
  handleDragEnd() {
    const module = this.refs.moduleGroup;
    const newPosition = {
      x: module.getX(),
      y: module.getY(),
      index: module.index
    }
    store.dispatch(actions.updateModulePosition(newPosition));
  }
  
  handleDoubleClick() {
    store.dispatch(actions.rotateSelectedModule(this.props))
  }
  
  render() {
    const image = (
      <Image
        x={this.props.imageX}
        y={this.props.imageY}
        height={this.props.imageHeight}
        width={this.props.imageWidth}
        image={this.state.image} 
      />
    );
    
    return (
      <Group 
        draggable="true"
        ref="moduleGroup"
        name="moduleGroup"
        x={this.props.x}
        y={this.props.y}
        height={this.props.height}
        width={this.props.width}
        onDragEnd={this.handleDragEnd.bind(this)}
        onDragMove={this.handleDragMove.bind(this)}
        onMouseOver={this.handleMouseOver.bind(this)}
        onMouseOut={this.handleMouseOut.bind(this)}
        
      >  
          <Text 
            ref="text"
            x={this.props.textX}
            y={this.props.textY}
            width={this.props.width}
            text={this.props.text}
            fontSize={this.props.fontSize}
            fontFamily={this.props.fontFamily}
          /> 
          
          <Group
            ref="innerGroup"
            x={this.props.innerGroupX || 0}
            y={this.props.innerGroupY || 0}
            rotation={this.props.rotation}
            onDblClick={this.handleDoubleClick.bind(this)}
          >
              
            <Rect
              ref="topLayer"
              width={this.props.width} 
              height={this.props.height}
              fill={this.props.fill}
              opacity={this.props.opacity}
            />
               
            <Rect
              name="moduleBorder"
              ref="moduleBorder"
              width={this.props.width} 
              height={this.props.height}
              stroke = {this.props.stroke}
              strokeWidth = {this.props.strokeWidth}
            />
               
            {this.props.imageSrc ? image: <Group></Group>}
        </Group>
      </Group>
    )
  }
}

