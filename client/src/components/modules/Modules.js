
import React, { Component } from 'react';
import { Layer, Rect, Stage, Group } from 'react-konva';
import { connect } from 'react-redux';
import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import Module from './ModulesItem';


class MoudleContainer extends Component{
  render() {
    const modules = this.props.modules.map((modules, index) => {
      //console.log('rerendering from ModuleList', modules.image)
      return <Module 
          key={index}
          index={index}
          x={modules.x} 
          y={modules.y}
          height={modules.height}
          width={modules.width}
          image={modules.image}
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
   modules: state.currentProjectModules
});

export default connect(mapStateToProps)(MoudleContainer);
