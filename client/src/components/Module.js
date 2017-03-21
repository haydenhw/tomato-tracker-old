import React, { Component } from 'react';
import {Layer, Stage, Image} from 'react-konva';
import * as actions from '../actions/indexActions';
import store from '../store';
import collide from '../helper-functions/collide';
import collideFromSideBar from '../helper-functions/collideFromSideBar';

export default class Module extends Component {
  
  constructor(props) {
    super(props)
    this.state = { 
      image: null,
      isNewModuleDropping: false,
      stroke: null
    }
  }
    
    componentWillMount() {
      console.log('will mount')
      this.setState({isNewModuleDropping: true});
      console.log(this.state.isNewModuleDropping)
    }
    
    componentDidMount() {
      const draggingModule = this.refs.module;
      const boardGroup = draggingModule.getParent();
      const moduleNodes = boardGroup.get(".module");
      
      collide(draggingModule, moduleNodes);
      
      const image = new window.Image();
      image.src = this.props.image;
      image.onload = () => {
        this.setState({
          image: image
        });
      }
    }
    
    componentDidUpdate() {
      console.log('did update')
      const draggingModule = this.refs.module;
      const stage = draggingModule.getParent().getParent();
      const moduleNodes = stage.get(".module");
      const boardGroup = stage.get(".boardGroup")[0];
      
      if (boardGroup) {
        collideFromSideBar(draggingModule, moduleNodes, boardGroup, this.state.isNewModuleDropping);
      }
    }
    
    
    updatePosition() {
    
      
      const module = this.refs.module
      const newPosition = {
        x: module.getX(),
        y: module.getY(),
        index: module.index
      }
      store.dispatch(actions.updateModulePosition(newPosition))
    }
    
    checkBoundaries() {
      const draggingModule = this.refs.module;
      const boardGroup = draggingModule.getParent();
      const moduleNodes = boardGroup.get(".module");
      //console.log(boardGroup.getParent().getParent().get(".module"))
      
      collide(draggingModule, moduleNodes);
    }
    render() {
      const { x, y, height, width, index } = this.props;
        return (
            <Image
              ref="module"
              name="module"
              index={index}
              x={x}
              y={y}
              height={height}
              width={width}
              image={this.state.image}
              icon={this.state.image}
              stroke={null}
              draggable="true"
              onDragEnd={this.updatePosition.bind(this)}
              onDragMove={this.checkBoundaries.bind(this)}
              
            />
        );
    }
}