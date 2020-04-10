import validator from 'validator';

export const isFilled = (value) => {
  return !validator.isEmpty(value + "") && value !== null;
}

export const isEmailValid = (email) => {
  return validator.isEmail(email)
}

export const isPasswordValid = (password) => {
  return password.length > 6;
}

export const isCurrencyValid = (amount, min) => {
  return validator.isCurrency(amount);
}

export const min = (amount, minimumValue) => {
  return amount >= minimumValue;
}

export const isURLValid = (url) => {
  return validator.isURL(url);
}

export const isNumeric = (number) => {
  return validator.isNumeric(number + "");
}

export const isLengthValid = (item, length) => {
  return item.length === length;
}
