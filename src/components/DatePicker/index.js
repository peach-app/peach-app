import React from 'react';
import PropTypes from 'prop-types';
import DatePickerBase from 'react-native-datepicker';
import moment from 'moment';

import { useTheme } from '../../theme-provider';
import { Label } from '../Label';

const DATE_FORMAT = 'YYYY-MM-DD';

export const DatePicker = ({
  label,
  placeholder,
  mode,
  error,
  onChange,
  date,
}) => {
  const theme = useTheme();

  return (
    <>
      {label && <Label>{label}</Label>}
      <DatePickerBase
        date={date}
        mode={mode}
        placeholder={placeholder}
        format={DATE_FORMAT}
        minDate={moment().format(DATE_FORMAT)}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateInput: {
            flex: 1,
            borderWidth: theme.inputBorderWidth,
            color: theme.foreground,
            borderColor: error ? theme.error : theme.grey,
            borderRadius: theme.radius,
            paddingVertical: 0,
            paddingHorizontal: theme.spacing,
            minHeight: 38,
            fontFamily: theme.fontFamily.regular,
          },
          btnTextConfirm: {
            color: theme.brand,
            fontWeight: 'bold',
          },
          btnTextCancel: {
            color: theme.brand,
            fontWeight: 'bold',
          },
          datePickerCon: { backgroundColor: theme.background },
        }}
        showIcon={false}
        onDateChange={onChange}
      />

      {error && <Label error>{error}</Label>}
    </>
  );
};

DatePicker.defaultProps = {
  placeholder: 'Select date',
  mode: 'date',
  label: 'Date',
};

DatePicker.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  mode: PropTypes.string,
  error: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  date: PropTypes.string.isRequired,
};
