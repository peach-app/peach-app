import React from 'react';
import DatePickerBase from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { TextInput } from '../TextInput';

export const DatePicker = ({ value, onChange, label, error }) => (
  <DatePickerBase
    selected={value}
    onChange={onChange}
    customInput={<TextInput label={label} error={error} />}
  />
);
