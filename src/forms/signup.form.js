import React, { Component } from 'react';
import TextField from 'components/TextField.component';
import Button from 'components/Button.component';
import DatePicker from 'components/DatePicker.component';
import CurrencyFormat from 'react-currency-format';
import {
  isFilled,
  isEmailValid,
  isURLValid,
  isLengthValid,
  min
} from 'common/helpers/validators';
import './signup.form.css';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: {
        value: "",
        error: false
      },
      lastName: {
        value: "",
        error: false
      },
      email: {
        value: "",
        error: false
      },
      startdate: {
        value: "",
        error: false
      },
      url: {
        value: "",
        error: false
      },
      salary: {
        value: "",
        quantity: "",
        error: false,
        errorMessage: "Salary cannot be empty."
      },
      occupation: {
        value: "",
        error: false
      },
      zipcode: {
        value: "",
        error: false
      },
      result: ""
    }
  }

  onChange(event) {
    let { name } = event.target;
    this.setState({ [name]: {
        ...this.state[name],
        value: event.target.value
      }
    })
  }

  isFieldValid(validator, key) {
    let isValid = validator(this.state[key].value);

    this.setState({
      [key]: {
        value: this.state[key].value,
        error: !isValid,
        errorMessage: this.state[key].errorMessage
      }
    });

    return isValid;
  }

  submit(event) {
    event.preventDefault();
    if (!this.validate()) {
      return;
    }
    let { firstName, lastName, occupation, email, url, salary, startdate, zipcode } = this.state;
    this.setState({result: `Success! First Name: ${firstName.value}, Last Name: ${lastName.value}, Occupation: ${occupation.value}, Email: ${email.value}, URL: ${url.value}, Zipcode: ${zipcode.value}, Desired Start Date: ${startdate.value}, Desired Salary: ${salary.value}`});
  }

  validate() {
    let fields = new Set();
    fields.add(this.isFieldValid(isFilled, "firstName"));
    fields.add(this.isFieldValid(isFilled, "lastName"));
    fields.add(this.isFieldValid(isFilled, "occupation"));
    fields.add(this.isFieldValid(isEmailValid, "email"))
    fields.add(this.isPersonalURLValid());
    fields.add(this.isFieldValid(isFilled, "startdate"));
    fields.add(this.isSalaryMin(min, 60000, "salary", "Minimum salary is $60,000."));
    fields.add(this.isZipcodeValid());

    return !fields.has(false);
  }

  isPersonalURLValid() {
    let { value } = this.state.url;

    let isValid = isURLValid(value) || value.length === 0;

    this.setState({
      url: {
        ...this.state.url,
        error: !isValid
      }
    });

    return isValid;
  }


  isSalaryMin(validator, value, key, errorMessage) {
    this.setState({
      [key]: {
        quantity: this.state[key].quantity,
        value: this.state[key].value,
        error: !validator(this.state[key].quantity, value),
        errorMessage: errorMessage
      }
    });

    return validator(this.state[key].quantity, value);
  }

  onValueChange(values) {
    const {formattedValue, value} = values;
    this.setState({ salary: {
        ...this.state.salary,
        value: formattedValue,
        quantity: value,
      }
    });
  }

  onChangeDate(key, value) {
    this.setState({
      [key]: {
        value,
        error: false
      },
    });
  }

  onChangeZipcode(event) {
    let { value } = event.target

    if (value.length > 5) return;

    let OK = /[0-9+$]/.test(value)

    if (!OK && value.length > 0) return;

    if (value.length > 0) {
      value = parseInt(value);
    } else {
      value = "";
    }

    this.setState({ zipcode: {
        value
      }
    })
  }

  isZipcodeValid() {
    let value = this.state.zipcode.value.toString();
    let isValid = isLengthValid(value, 5);
    let errorMessage = "Zipcode cannot be empty.";

    if (!isValid && value.length > 0) {
      errorMessage = "Zipcode must be five digits.";
    }

    this.setState({
      zipcode: {
        ...this.state.zipcode,
        error: !isValid,
        errorMessage
      }
    });
    return isValid;
  }

  render() {
    let {
      firstName,
      lastName,
      occupation,
      url,
      email,
      startdate,
      salary,
      zipcode
    } = this.state;

    return(
      <div className="container">
        <form onSubmit={this.submit.bind(this)} className="signup-form">
          <TextField
            error={firstName.error}
            value={firstName.value}
            name="firstName"
            errorMessage="First name cannot be empty."
            label="First Name"
            placeholder="First Name"
            onChange={this.onChange.bind(this)} />
          <TextField
            error={lastName.error}
            value={lastName.value}
            name="lastName"
            errorMessage="Last name cannot be empty."
            label="Last Name"
            placeholder="Last Name"
            onChange={this.onChange.bind(this)} />
          <TextField
            error={occupation.error}
            value={occupation.value}
            name="occupation"
            errorMessage="Occupation cannot be empty."
            label="Occupation"
            placeholder="Occupation"
            onChange={this.onChange.bind(this)} />
          <TextField
            error={url.error}
            value={url.value}
            name="url"
            errorMessage="Please enter a vaild url."
            label="Personal Website (Optional)"
            placeholder="Personal Website"
            onChange={this.onChange.bind(this)} />
          <TextField
            error={email.error}
            value={email.value}
            name="email"
            errorMessage="Please enter a vaild e-mail."
            label="E-mail"
            placeholder="E-mail"
            onChange={this.onChange.bind(this)} />
          <DatePicker
            timeFormat={false}
            isValidDate={(current) => current > new Date()}
            fontStyle="tertiary"
            value={(startdate.value ? new Date(startdate.value) : null)}
            placeholder="Desired Start Date"
            errorMessage="Desired start date cannot be empty."
            error={startdate.error}
            onChange={this.onChangeDate.bind(this, "startdate")}
            label="Desired Start Date"
            size="large"/>
          <CurrencyFormat
            thousandSeparator={true}
            prefix='$'
            customInput={TextField}
            name="salary"
            value={salary.quantity}
            error={salary.error}
            errorMessage={salary.errorMessage}
            label="Desired Salary - Min. $60,000"
            placeholder='Desired Salary'
            onValueChange={this.onValueChange.bind(this)} />
          <TextField
            name="zipcode"
            label="Zipcode"
            error={zipcode.error}
            value={zipcode.value}
            errorMessage={zipcode.errorMessage}
            placeholder="Zipcode"
            onChange={this.onChangeZipcode.bind(this)} />
          <Button
            style={{marginTop: '25px'}}
            type="submit"
            label="Submit"/>
        </form>
        <div style={{marginTop: '25px'}}>{this.state.result}</div>
      </div>
    )
  }
}

export default SignUpForm;
