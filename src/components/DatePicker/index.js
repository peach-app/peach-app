/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { default as ImportedDatePicker } from 'react-native-datepicker';
import moment from 'moment';
import { withTheme } from 'styled-components/native';
import Label from '../Label';

const DATE_FORMAT = 'YYYY-MM-DD';

const DatePickerComponent = ({
  label,
  theme,
  placeholder,
  mode,
  error,
  onChange,
  date,
}) => {
  return (
    <>
      {label && <Label>{label}</Label>}
      <ImportedDatePicker
        date={date}
        mode={mode}
        placeholder={placeholder}
        format={DATE_FORMAT}
        minDate={moment().format(DATE_FORMAT)}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateInput: {
            width: undefined,
            borderWidth: theme.inputBorderWidth,
            borderColor: error ? theme.error : theme.grey,
            borderRadius: theme.radius,
            paddingVertical: 0,
            paddingHorizontal: theme.spacing,
            minHeight: 38,
            fontFamily: theme.fontFamily,
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

DatePickerComponent.defaultProps = {
  placeholder: 'Select date',
  mode: 'date',
  label: 'Date',
};

DatePickerComponent.propTypes = {
  label: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  mode: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  date: PropTypes.string,
};

export const DatePicker =  withTheme(DatePickerComponent);
