import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default function callOnTargetUpdate(getTargetInfo, targetAction) {
  return (WrappedComponent) => {
    return class BaseComponent extends Component {
      componentDidUpdate(prevProps) {
        const { targetPropKey, targetValue } = getTargetInfo(this.props); 
        
        if ((prevProps[targetPropKey] !== targetValue) && (this.props[targetPropKey]) === targetValue) {
          console.log('calling target func new')
          
          targetAction(this.props);
          // handleSubmit(onTargetUpdate)(); 
          // onTargetUpdate();
        }
      }
      render() {
        // console.log(this.props)
        return <WrappedComponent {...this.props} /> 
      }
    }
  }
}  

