import React, { Component } from 'react';
import { Rect, Group, Image, Text } from 'react-konva';

export default class TestModule extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      image: null
    }
  }
  
  componentDidMount() {
    
    const image = new window.Image();
    console.log(this.props.imageSrc === 'images/untitled.svg')
    image.src = require('images/circuit-board.png');
    
    image.onload = () => {
      this.setState({
        image: image
      });
    }
    
    //this.highlightRuleBreakingMoudles();
  }
  
  highlight() {

    this.refs.top.attrs.stroke = "black"
    const groupRotation = this.refs.group.attrs.rotation ;
    this.refs.group.rotation(groupRotation + 90);
    
    console.log(this.refs.group.attrs)
    const textRotation = this.refs.text.attrs.rotation ;
    
    this.refs.text.rotation(textRotation + 270)
    console.log()
    const x = this.refs.group.attrs.x;
  
    if (groupRotation + 90 === 90)
      this.refs.group.attrs.x = x + 200;
      
  /*  if (groupRotation + 90 === 180)
      this.refs.group.attrs.y = this.refs.group.attrs.y - 300 ;*/
  }
  
  
  render() {
    console.log(this.props)
    return (
      
      <Group
        x={this.props.x || 0}
        y={this.props.y || 0}
        ref="group"
        rotation={this.props.rotation}
        onClick={this.highlight.bind(this)}
        draggable="true"
      >
        <Text 
          ref="text"
          x={this.props.textX}
          y={this.props.textY}
          text={this.props.text}
          fontSize={this.props.fontSize}this
          fontFamily={this.props.fontFamily}
        /> 
          
        <Rect
          ref="top-layer"
          width={this.props.width} 
          height={this.props.height}
          fill={this.props.fill}
          opacity={this.props.opacity}
        />
           
        <Rect
          name="module-border"
          ref="top"
          width={this.props.width} 
          height={this.props.height}
          stroke = {this.props.stroke}
          strokeWidth = {this.props.strokeWidth}
        />
           
        {/* <Image
          ref="bottom-layer"
          name="module"
          x={this.props.imageX}
          y={this.props.imageY}
          height={this.props.imageHeight}
          width={this.props.imageWidth}
          image={this.state.image} 
       /> */}
    </Group>
    )
  }
}

