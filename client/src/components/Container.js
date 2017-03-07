import React, { Component } from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';

export default class Container extends Component {
  
  test() {
    
  }
  
  render() {
      return (
        <Layer>
          <Group>
              <Rect
                ref="container"
                width="500"
                height="500"
                fill="#e3e3e5"
                onMouseMove={this.test.bind(this)}
              />
          </Group>
        </Layer>
          
      );
  }
}