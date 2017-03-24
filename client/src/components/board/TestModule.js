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
    image.src = require('images/untitled.svg');
    
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
    return (
      <Group
        x={ 0 }
        y={ 0 }
        ref="group"
        rotation={0}
        onClick={this.highlight.bind(this)}
        draggable="true"
      >
        <Text 
          ref="text"
          x={300/2 - 100}
          y={25}
          text="Simple Text"
          fontSize={10}
          fontFamily="Calibri"
        /> 
          
          <Rect
            ref="top-layer"
            x={0} y={0} width={300} height={100}
            fill="red"
            opacity={0.1}
           />
           
           <Rect
               name="module-border"
               ref="top"
               x={0} y={0} width={300} height={100}
               stroke = "black"
               strokeWidth = ".75"
            />
           
            <Image
              ref="bottom-layer"
              name="module"
              x={60}
              y={25}
              height={50}
              width={50}
              stroke={"grey"}
              strokeWidth = ".75"
              image={this.state.image}
           />
        </Group>
    )
  }
}

