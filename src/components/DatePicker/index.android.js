import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DateTimePicker from '@react-native-community/datetimepicker';
import FormatDate from 'date-fns/format';

import { Touchable, Spacer } from './styles';
import { TextInput } from '../TextInput';

const today = new Date();

export const DatePicker = ({
  label,
  error,
  value,
  onChange,
  placeholder,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Touchable onPress={() => setOpen(true)}>
        <TextInput
          value={value ? FormatDate(new Date(value), 'dd/MM/yyyy') : ''}
          editable={false}
          label={label}
          error={error}
          placeholder={placeholder}
        />
        <Spacer />
      </Touchable>

      {open && (
        <DateTimePicker
          value={value || today}
          onChange={(_, selectedDate) => {
            setOpen(false);
            onChange(selectedDate);
          }}
          {...props}
        />
      )}
    </>
  );
};

DatePicker.defaultProps = {
  label: null,
  error: null,
  value: null,
  placeholder: 'Select a date',
};

DatePicker.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.any,
  placeholder: PropTypes.string,
};
