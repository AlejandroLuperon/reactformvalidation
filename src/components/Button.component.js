import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  static defaultProps = {
    style: {},
    type: ""
  }

  onClick() {
    let { onClick } = this.props;
    if (onClick) {
      onClick();
    }
  }

  onSubmit(event) {
    event.preventDefault();
    let { onSubmit } = this.props;
    if (onSubmit) {
      onSubmit(event);
    }
  }

  getBase() {
    let {
      label,
      type,
      style
    } = this.props;

    if (type === "submit") {
      return (
        <input
          type={type}
          style={style}
          className="blog-button" />
        )
    }

    return(
      <button
        type={type}
        style={style}
        className="blog-button"
        onSubmit={this.onSubmit.bind(this)}
        onClick={this.onClick.bind(this)}>
      {label}</button>
    )
  }

  render() {
    return this.getBase();
  }
}

export default Button;
