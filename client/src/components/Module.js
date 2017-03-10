import React, { Component } from 'react';
import {Layer, Stage, Image} from 'react-konva';
import * as actions from '../actions/indexActions';
import store from '../store';

export default class Module extends Component {
    state = {
      image: null
    }
    
    componentDidMount() {
      const image = new window.Image();
      image.src = this.props.image;
      image.onload = () => {
        this.setState({
          image: image
        });
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

    render() {
      const { x, y, height, width, index} = this.props;
        return (
            <Image
              ref="module"
              index={index}
              x={x}
              y={y}
              height={height}
              width={width}
              image={this.state.image}
              draggable="true"
              onDragEnd={this.updatePosition.bind(this)}
            />
        );
    }
}