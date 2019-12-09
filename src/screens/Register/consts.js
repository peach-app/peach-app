import { USER_TYPE } from '../../consts';

export const USER_TYPE_TABS = Object.values(USER_TYPE);

export const FORM_INPUTS = [
  {
    label: 'Name',
    name: 'name',
    autoCapitalize: 'none',
  },
  {
    label: 'Email Address',
    name: 'email',
    keyboardType: 'email-address',
    autoCapitalize: 'none',
  },
  {
    label: 'Password',
    name: 'password',
    secureTextEntry: true,
  },
];

export const FORM_ERROR_MESSAGES = {
  REQUIRED_NAME: 'Please enter your name',
  REQUIRED_EMAIL: 'Please enter an email address',
  INVALID_EMAIL: 'Please enter a valid email address',
  REQUIRED_PASSWORD: 'Please enter a password',
};
