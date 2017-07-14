import React, { Component} from 'react';
import PropTypes from 'prop-types';

export default function callOnTargetUpdate (Component) {
  return class Wrapper extends Component {
    componentDidUpdate(prevProps) {
      const { handleSubmit, handleProjectSubmit, onTargetUpdate, targetPropKey, targetValue } = this.props;
      
      if ((prevProps[targetPropKey] !== targetValue) && (this.props[targetPropKey]) === targetValue) {
        console.log('calling target func new')
        
        handleSubmit(onTargetUpdate)(); 
        // onTargetUpdate();
        
      }
    }
    
    render() {
      // console.log(this.props)
      return <Component {...this.props} /> 
    }
  }
}  
