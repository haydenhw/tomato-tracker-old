import React, { Component} from 'react';
import PropTypes from 'prop-types';

export default function callOnTargetUpdate (WrappedComponent) {
  return class Wrapper extends Component {
    componentDidUpdate(prevProps) {
      const { onTargetUpdate, targetPropKey, targetValue } = this.props;
      
      if ((prevProps[targetPropKey] !== targetValue) && (this.props[targetPropKey]) === targetValue) {
        onTargetUpdate();
      }
    }
    
    render() {
      return <WrappedComponent {...this.props} {...this.state} /> 
    }
  }
}  
