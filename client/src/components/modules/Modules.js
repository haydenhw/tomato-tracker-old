import React, { Component } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import { connect } from 'react-redux';
import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import ModulesItem from './ModulesItem';
import { modulesData } from './modulesData'

class MoudleContainer extends Component{

  render() {  
    const modules = this.props.modules/*modulesData*/.map((module, index) => {
      
      return <ModulesItem 
          key={index}
          index={index}
          x={module.x}
          y={module.y}
          width={module.width}
          height={module.height}
          boundToSideIndex={module.boundToSideIndex}
          innerGroupX={module.innerGroupX}
          innerGroupY={module.innerGroupY}
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
          topLeftAnchor={this.props.topLeftAnchor}
          selectedModuleProps={this.props.selectedModuleProps}
          anchorPositions={this.props.anchorPositions}
          boardSpecs={this.props.boardSpecs}
        />
    });
    return (
      <Group>
        {modules}
      </Group>
    )
  }
  
}

const mapStateToProps = (state) => ({
   modules: state.currentProjectModules,
   topLeftAnchor: state.anchorPositions.topLeft,
   selectedModuleProps: state.selectedModule,
   boardSpecs: state.boardSpecs,
   anchorPositions: state.anchorPositions
});

export default connect(mapStateToProps)(MoudleContainer);
