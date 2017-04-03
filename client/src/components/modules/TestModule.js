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
    image.src = require(this.props.imageSrc);
    image.onload = () => {
      this.setState({
        image: image
      });
    }
    
    //this.highlightRuleBreakingMoudles();
  }
  
  highlight() {

    this.refs.top.attrs.stroke = "black"
    const groupRotation = this.refs.group.attrs.rotation;
    console.log(groupRotation)
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
    
  
      
      
  /*  if (groupRotation + 90 === 180y
      this.refs.group.attrs.y = this.refs.group.attrs.y - 300 ;*/
  }
  
  
  render() {
    return (
    <Group draggable="true">  
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
          x={this.props.x || 0}
          y={this.props.y || 0}
          ref="group"
          rotation={this.props.rotation}
          onClick={this.highlight.bind(this)}
        >
            
          <Rect
            ref="topLayer"
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
             
          <Image
            ref="bottom-layer"
            name="module"
            x={this.props.imageX}
            y={this.props.imageY}
            height={this.props.imageHeight}
            width={this.props.imageWidth}
            image={this.state.image} 
         />
      </Group>
    </Group>
    )
  }
}

