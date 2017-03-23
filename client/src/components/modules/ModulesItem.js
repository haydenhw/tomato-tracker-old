import React, { Component } from 'react';
import {Layer, Stage, Image} from 'react-konva';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import enforceRules from 'helpers/enforceRules';
//import checkBounds from 'helpers/checkBounds';


export default class ModulesItem extends Component {
    state = {
      image: null
    }
    
    checkCollision() {
      const draggingModuleNode = this.refs.module;
      const boardGroup = draggingModuleNode.getParent();
      const moduleNodes = boardGroup.get(".module");
      const boardNode = boardGroup.getParent().get(".board")[0];
      
      const redStroke = node => node.attrs.stroke = "red";
      const nullStroke = node => node.attrs.stroke = null;
      
      enforceRules(moduleNodes, boardNode, redStroke, nullStroke);
    }
    
    
    
    handleMouseOver () {
      const moduleData = {
        index: this.attrs.index
      }
      console.log(this.attrs.index, this.attrs.image.src)
      store.dispatch(actions.updateSelectedModule(moduleData))
    }
    handleMouseOut () {
      //store.dispatch(actions.updateSelectedModule({}))
    }
    
    handleDragMove() {
       this.checkCollision();
    }
    
    handleDragEnd() {
      const module = this.refs.module
      const newPosition = {
        x: module.getX(),
        y: module.getY(),
        index: module.index
      }
      store.dispatch(actions.updateModulePosition(newPosition))
    }
    
    componentDidUpdate(prevProps, prevState) {
  
      console.log('from did update', this.props.image)
      console.log(prevState)
      
      if (prevState.image) {
        const prevImageSrc = prevState.image.getAttribute("src")
        
        if (prevImageSrc !== this.props.image) {
          const image = new window.Image();
          image.src = this.props.image;
          image.onload = () => {
            this.setState({
              image: image
            });
          }
        }
        
      }
      
      /*const image = new window.Image();
      image.src = this.props.image;
      image.onload = () => {
        this.setState({
          image: image
        });
      }*/
    }
    
    componentDidMount() {
      console.log('component mounted')
      const image = new window.Image();
      image.src = this.props.image;
      image.onload = () => {
        this.setState({
          image: image
        });
      }
      
      this.checkCollision();
    }
    
    render() {
      const { x, y, height, width, index } = this.props;
      //console.log('from module item rerender', this.props.image)
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
              draggable="true"
              onDragEnd={this.handleDragEnd.bind(this)}
              onDragMove={this.handleDragMove.bind(this)}
              onMouseOver={this.handleMouseOver}
              onMouseOut={this.handleMouseOut}
            />
        );
    }
}
