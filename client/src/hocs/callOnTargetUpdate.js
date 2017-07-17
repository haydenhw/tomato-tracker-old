import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function callOnTargetUpdate(getTargetInfo, onTargetUpdate) {
  return (WrappedComponent) => {
    return class BaseComponent extends Component {
      componentDidUpdate(prevProps) {
        
        const { targetPropKey, targetValue } = getTargetInfo(this.props); 
        console.log( this.props.remoteSubmitForm, targetValue, prevProps[targetPropKey], this.props[targetPropKey])
        if ((prevProps[targetPropKey] !== targetValue) && (this.props[targetPropKey]) === targetValue) {
          console.log('calling');
          onTargetUpdate(this.props);
        }
      }
      
      render() {
        
        return <WrappedComponent {...this.props} /> 
      }
    }
  }
}  

