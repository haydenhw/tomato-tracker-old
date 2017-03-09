
import React, { Component } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import MyRect from './Rect';
import { squareData } from '../data'
import * as actions from '../actions/indexActions';
import store from '../store';

export default function RectContainer(props) {
  const { x, y } = props
  const squares = squareData.map((square, index) =>{
    return <MyRect key={index} id={square.id} x={square.x} y={square.y}/>
  });
  
  return (
    <Group
      x={x}
      y={y}
      >
      {squares}
    </Group>
  )
}

const mapStateToProps = (state) => ({
  x: state.boardSpecs.x,
  y: state.boardSpecs.y
});
