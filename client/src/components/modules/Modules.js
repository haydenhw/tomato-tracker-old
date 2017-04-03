
import React, { Component } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import { connect } from 'react-redux';
import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import TestModule from './TestModule';
import { testModuleObject } from './ModulesTestObject'

class MoudleContainer extends Component{

  render() {  
    
    const module = testModuleObject; 
    /*const modules = testModule.map((module, index) => {
      
      //console.log('rerendering from ModuleList', modules.image)
      return <Module 
          key={index}
          index={index}
          x={module.x}
          y={module.y}
          width={module.width}
          height={module.height}
          rotation={module.rotation}
          text={module.text}
          textX= {module.textX}
          textY= {module.textY}
          fontSize= {module.fontSize}
          fontFamily={module.fontFamily}
          fill={module.fill}
          opacity={module.opacity}
          stroke={module.stroke}
          strokeWidth={module.strokeWidth}
          imageX={module.imageX}
          imageY={module.imageY}
          imageWidth={module.imageWidth}
          imageHeight={module.imageHeight}
          imageSrc={module.imageSrc} 
          iconSrc={module.iconSrc}
        />
    });
    console.log(modules)*/
    return (
      <Group>
        <TestModule 
            x= {module.x }
            key={1}
            index={1}
            x={module.x}
            y={module.y}
            width={module.width}
            height={module.height}
            rotation={module.rotation}
            text={module.text}
            textX= {module.textX}
            textY= {module.textY}
            fontSize= {module.fontSize}
            fontFamily={module.fontFamily}
            fill={module.fill}
            opacity={module.opacity}
            stroke={module.stroke}
            strokeWidth={module.strokeWidth}
            imageX={module.imageX}
            imageY={module.imageY}
            imageWidth={module.imageWidth}
            imageHeight={module.imageHeight}
            imageSrc={module.imageSrc} 
            iconSrc={module.iconSrc}
          />
      </Group>
    )
  }
  
}

const mapStateToProps = (state) => ({
   modules: state.currentProjectModules
});

export default connect(mapStateToProps)(MoudleContainer);
