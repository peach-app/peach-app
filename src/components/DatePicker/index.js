import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { withTheme } from 'styled-components/native';
import { useField } from 'formik';
import Label from '../Label';

const DATE_FORMAT = 'YYYY-MM-DD';

const DatePickerComponent = ({ label, theme, name, placeholder, mode }) => {
  const [field, meta] = useField(name);
  const { error } = meta;
  return (
    <>
      {label && <Label>{label}</Label>}

      <DatePicker
        date={field.value}
        mode={mode || 'date'}
        placeholder={placeholder || 'select date'}
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
        }}
        showIcon={false}
        onDateChange={field.onChange(name)}
      />

      {error && <Label error>{error}</Label>}
    </>
  );
};
DatePickerComponent.propTypes = {
  label: PropTypes.string,
  theme: PropTypes.object,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  mode: PropTypes.string,
};

export default withTheme(DatePickerComponent);
