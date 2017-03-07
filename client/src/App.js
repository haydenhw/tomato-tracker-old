import React, { Component } from 'react';
import {Layer, Rect, Stage, Group} from 'react-konva';
import Grid from './components/Grid';
import MyRect from './components/Rect';
import Container from './components/Container';
import RectContainer from './components/RectContainer';


export default class App extends Component {
  test() {
    console.log(this.refs)
  }
  render () {
    return (
      <div>
        <Stage ref="stage" width={700} height={700} onMouseMove={this.test.bind(this)}>
            <Grid />
            <Container />
            <RectContainer/>
        </Stage>
    </div>
     );
   }
}
