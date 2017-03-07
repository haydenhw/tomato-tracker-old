import React, { Component } from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';
import Grid from './components/Grid';
import MyRect from './components/Rect';
import Board from './components/Board';
import RectContainer from './components/RectContainer';


export default class App extends Component {
  test() {
  
  }
  render () {
    return (
      <div>
        <Stage ref="stage" width={5000} height={1000} onMouseMove={this.test.bind(this)}>
            <Grid />
            <Board />
        </Stage>
    </div>
     );
   }
}
