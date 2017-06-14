import React from 'react';
import PropTypes from 'prop-types';

import InlineEdit from 'react-edit-inline';


export default class TopNavbarEditableText extends React.Component {
  constructor() {
    super();
    this.state = {
      message: 'Click to Edit',
    };

    this.dataChanged = this.dataChanged.bind(this);
  }

  dataChanged(data) {
    const { handleChange } = this.props;
    
    handleChange(data.message);
    this.setState({ ...data });
  }

  customValidateText(text) {
    return (text.length > 0 && text.length < 64);
  }

  render() {
    const { text } = this.props;

    return (
      
        <InlineEdit
          validate={this.customValidateText}
          className="editable-text"
          activeClassName="editing"
          text={text || ''}
          paramName="message"
          change={this.dataChanged}
          style={{
            minWidth: 150,
            display: 'inline-block',
            margin: '13px 10px',
            padding: 0,
            fontSize: 20,
            border: 0,
          }}
        />
      );
  }
}

TopNavbarEditableText.propTypes = {
  handleChange: PropTypes.func,
  text: PropTypes.string,
};
