import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux'

import store from '../redux-files/store';

export default class ModalRoot extends Component {
  componentDidMount() {
    this.modalTarget = document.createElement('div');
    this.modalTarget.className = 'modal';
    document.body.appendChild(this.modalTarget);
    this._render();
  }
  // componentWillUpdate if using redux
  componentDidUpdate() {
    this._render();
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  _render() {
    const { children } = this.props;
    
    ReactDOM.render(
    <Provider store={store}>
      <div className="one modal-container">
        <div className="modal-background">
          {children}
        </div>
      </div>
    </Provider>,
    this.modalTarget
    );
  }

  render() {
    return <noscript />;
  }
}

ModalRoot.propTypes = {
  children: PropTypes.object.isRequired, 
}