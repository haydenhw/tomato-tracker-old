import React from 'react';
import {Layer, Rect, Line } from 'react-konva';

export default function Grid() {
  const grid = 20;
  const gridLines = [];
  
  for (var i = 0; i <= 2000/grid; i++) {
    gridLines.push(
      <Line
        key={'horz'+i}
        points={[ i * grid, 0, i * grid, 2000]}
        stroke='#ccc'
        strokeWidth='.5'
      />
    );

    gridLines.push(
      <Line
        key={'vert'+i}
        points={[ 0, i * grid, 2000, i * grid]}
        stroke='#ccc'
        strokeWidth='.5'
      />
    );
      
  }
  
  return (
    <Layer>
      {gridLines}
    </Layer>
    
  );
}