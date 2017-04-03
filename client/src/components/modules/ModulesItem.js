import React, { Component } from 'react';
import { Rect, Group, Image, Text } from 'react-konva';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import enforceRules from 'helpers/enforceRules';

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
    
    //this.highlightRuleBreakingMoudles();
  }
  
  rotate() {
    this.refs.top.attrs.stroke = "black"
    const groupRotation = this.refs.group.attrs.rotation;
    if (groupRotation === 360) {
      //this.refs.group.rotation(0);
      
    } else {
      this.refs.group.rotation(groupRotation + 90);
    }
    
    /*onsole.log(this.refs.group.attrs)
    const textRotation = this.refs.text.attrs.rotation;
    
    this.refs.text.rotation(textRotation + 270)
    console.log(this.refs.text)
    this.refs.text.attrs.x = this.refs.text.attrs.x - this.refs.topLayer.attrs.height*/
    const group = this.refs.group.attrs
    const x = group.x;
    const y = group.y;
    const height = this.refs.topLayer.attrs.height
    const width = this.refs.topLayer.attrs.width
    // rotate module about the center
    
    switch(groupRotation) {
      case 0: 
        group.x = x + .5 * (width + height);
        group.y = y + .5 * (height - width);
        break;
      case 90: 
        group.x = x + .5 * (width - height);
        group.y = y + .5 * (width + height);
        break;
      case 180: 
        group.x = x - .5 * (width + height);
        group.y = y + .5 * (width - height);
        break;
      case 270: 
        group.x = x - .5 * (width - height);
        group.y = y - .5 * (width + height);
        this.refs.group.rotation(0);
        break;
      default:
        console.log(groupRotation);
    }
  }
  
  highlightRuleBreakingMoudles() {
    
    const draggingModuleNode = this.refs.moduleBorder;
    const boardGroup = draggingModuleNode.getParent();
    const moduleNodes = boardGroup.get(".moduleBorder");
    const boardNode = boardGroup.getParent().getParent().getParent().get(".board")[0];
    
    const redStroke = node => node.attrs.stroke = "red";
    const nullStroke = node => node.attrs.stroke = "black";
    
    enforceRules(moduleNodes, boardNode, redStroke, nullStroke);
  }
  
  handleMouseOver() {
    const moduleData = {
      index: this.attrs.index
    }
    store.dispatch(actions.updateSelectedModule(moduleData));
    store.dispatch(actions.toggleIsMouseOverModule());
  }
  
  handleMouseOut() {
    store.dispatch(actions.toggleIsMouseOverModule());
  }
  
  handleDragMove() {
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
  
  render() {
    const image = (
      <Image
        ref="bottom-layer"
        name="module"
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
      x={this.props.x || 0}
      y={this.props.y || 0}
      onDragEnd={this.handleDragEnd.bind(this)}
      onDragMove={this.handleDragMove.bind(this)}
      onMouseOver={this.handleMouseOver}
      onMouseOut={this.handleMouseOut}
    >  
        <Text 
          ref="text"
          x={this.props.textX}
          y={this.props.textY}
          rotation={0}
          width={this.props.width}
          text={this.props.text}
          fontSize={this.props.fontSize}
          fontFamily={this.props.fontFamily}
        /> 
        
        <Group
          rotation={this.props.rotation}
          onClick={this.rotate.bind(this)}
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

