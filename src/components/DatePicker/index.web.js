import React from 'react';
import { TextInput } from '../TextInput';

export const DatePicker = ({ value, ...props }) => (
  <TextInput value={value.toLocaleDateString()} {...props} />
);
