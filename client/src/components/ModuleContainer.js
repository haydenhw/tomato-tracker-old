import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { getModulesUrl } from '../config/endpointUrls.js';
class SelectMoudles extends Component {
  
  componentDidMount() {
    this.props.getData(getModulesUrl);
  }

  render() {
    if (this.props.modules) {
      
      const moduleList = this.props.modules.map((module, index) => {
        return <li key={index}> {module.function} </li> 
      });
      
      return (
          <ul>
              {moduleList}
          </ul>
      );
    } 
    else {
      return <div></div>
    }
  }
};

const mapStateToProps = (state, props) => ({
  modules: state.modules
});

const mapDispatchToProps = (dispatch) => {
  return {
      getData: (url) => dispatch(actions.fetchModules(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectMoudles);