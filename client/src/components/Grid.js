import React from 'react';
import {Layer, Rect, Line } from 'react-konva';

export default function Grid() {
  const grid = 50;
  const gridLines = [];
  
  for (var i = 0; i <= 600/50; i++) {
    gridLines.push(
      <Line
        key={'horz'+i}
        points={[ i * grid, 0, i * grid, 600]}
        stroke='#ccc'
      />
    );

    gridLines.push(
      <Line
        key={'vert'+i}
        points={[ 0, i * grid, 600, i * grid]}
        stroke='#ccc'
      />
    );
      
  }
  
  return (
    <Layer>
      {gridLines}
    </Layer>
    
  );
}