import React, { Component } from 'react';
import {Layer, Rect, Group} from 'react-konva';
import RectContainer from './RectContainer';
import Anchor from './Anchor';


export default class Board extends Component {
  
  test() {
    
  }
  
  render() {
      return (
        <Layer>
          <Group
            draggable="true"
            >
              <Rect
                ref="board"
                name={"board"}
                width="500"
                height="500"
                fill="#e3e3e5"
                opacity="0.5"
                stroke="#ccc"
                onMouseMove={this.test.bind(this)}
              />
              <Anchor x={0} y={0} name={"topLeft"} />
              <Anchor x={500} y={0} name={"topRight"} />
              <Anchor x={0} y={500} name={"bottomLeft"} />
              <Anchor x={500} y={500} name={"bottomRight"} />
              
              <RectContainer />
          </Group>
        </Layer>
          
      );
  }
}