import React, { Component } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import Grid from './Grid';
import MyRect from './Rect';
import Board from './Board';
import RectContainer from './RectContainer';
import BoardDimensionInput from './BoardDimensionInput';
import Button from './Button';


export default class App extends Component {
  test() {
  
  }
  render () {
    return (
      <div>
        <Button/>
        <BoardDimensionInput />
        <Stage ref="stage" width={5000} height={1000} onMouseMove={this.test.bind(this)}>
          <Grid gridWidth={5000}  cellWidth={20} />
          <Board />
        </Stage>
    </div>
     );
   }
}

/*  <BoardDimensionInput />*/
