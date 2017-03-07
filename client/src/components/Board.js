import React, { Component } from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';
import RectContainer from './RectContainer'

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
                ref="container"
                width="500"
                height="500"
                fill="#e3e3e5"
                opacity="0.5"
                stroke="#ccc"
                onMouseMove={this.test.bind(this)}
              >
                
              </Rect>
              <RectContainer />
          </Group>
          
        </Layer>
          
      );
  }
}