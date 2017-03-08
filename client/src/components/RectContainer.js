
import React, { Component } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import MyRect from './Rect';
import { squareData } from '../data'

export default function RectContainer(props) {
  const squares = squareData.map((square, index) =>{
    return <MyRect key={index} id={square.id} x={square.x} y={square.y}/>
  });
  
  return (
    <Group>
      {squares}
    </Group>
  )
}