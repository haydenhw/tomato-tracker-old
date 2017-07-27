import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';

import { updateConfig } from '../actions/indexActions';
import { hasAnyValue, isDuplicate } from '../helpers/validate';

import FormModal from '../components/FormModal';
import ConfigForm from '../components/ConfigForm';

class ConfigModal extends Component {
  handleUpdateConfig = (submitData) => {
    const { updateConfig } = this.props; 
    const { alarmSound } = submitData;
    
    const newConfigData = {
      alarmSoundSrc: alarmSound || 'sound/Old-clock-ringing-short.mp3' 
    }
    console.log(newConfigData)
    updateConfig(newConfigData);
  } 
  
  render () {
    
    return (
      <ConfigForm handleFormSubmit={this.handleUpdateConfig.bind(this)} />  
    );
  }
}
const mapStateToProps = state => {
  const { projects } = state;
  
  return {
    projects: projects.items
  }
}

export default connect(mapStateToProps, { updateConfig })(ConfigModal);

ConfigModal.propTypes = {
  
}
