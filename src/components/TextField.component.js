import React, { Component } from 'react';
import './TextField.css';

class TextField extends Component {
  static defaultProps = {
    size: "large"
  }

  setSize() {
    let { size } = this.props;
    if (size === 'large') return 'textfield-large';
  }

  render() {
    let {
      name,
      value,
      placeholder,
      label,
      errorMessage,
      error,
      onChange
    } = this.props;

    return(
      <div className={`d-flex flex-column ${this.setSize()}`}>
        <label className="form-item-label">{label}</label>
        <input
          className={`textfield regular-text ${this.setSize()}`}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange.bind(this)} />
        {(error ? <div className="error-text-container"><div className="error-text form-item-error">{errorMessage}</div></div> : null)}
      </div>
    )
  }
}

export default TextField;
