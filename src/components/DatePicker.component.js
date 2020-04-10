import Datetime from 'react-datetime'
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './DatePicker.css';

const dateFormat = 'MM/DD/YYYY';

class DatePicker extends Component {
  static propTypes = {
    label: PropTypes.string,
    size: 'large'
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      active: false,
      date: null,
      focused: false
    };
  }

  setSize() {
    let { size } = this.props;
    if (size === 'large') return 'textfield-large';
  }

  getBase() {
    let { timeFormat, value, onChange, placeholder, isValidDate } = this.props;
    let className = `textfield regular-text ${this.setSize()}`;
    return (<Datetime
      isValidDate={isValidDate}
      timeFormat={timeFormat}
      dateFormat="YYYY-MM-DD"
      placeholder={placeholder}
      value={(value ? moment(value, dateFormat) : null)}
      onChange={onChange.bind(this)}
      inputProps={{ className, readOnly: true, placeholder: `${placeholder}`}} />);
  }

  render() {
    let { error, errorMessage } = this.props;

    return (
      <div className={`d-flex flex-column ${this.setSize()}`}>
        <label className="form-item-label">{this.props.label}</label>
        {this.getBase()}
        {(error ? <div className="error-text-container"><div className="error-text form-item-error">{errorMessage}</div></div> : null)}
      </div>
    );
  }
}

export default DatePicker;
