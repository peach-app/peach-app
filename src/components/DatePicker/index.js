import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { default as ImportedDatePicker } from 'react-native-datepicker';
import moment from 'moment';
import { withTheme } from 'styled-components/native';
import { Modal } from 'react-native';
import Label from '../Label';

import { Main, Content } from './styles';
import { Button } from '../Button';
import { Actions } from '../Actions';

export const DatePickerComponent = ({
  label,
  error,
  value,
  date,
  mode,
  placeholder,
  theme,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

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

      <Modal
        visible={open}
        presentationStyle="overFullScreen"
        transparent
        animationType="fade"
      >
        <Main>
          <Content>
            <DateTimePicker value={value} {...props} />
            <Actions>
              <Button title="Done" onPress={() => setOpen(false)} fixedWidth />
            </Actions>
          </Content>
        </Main>
      </Modal>
    </>
  );
};

DatePickerComponent.defaultProps = {
  label: null,
  error: null,
};

DatePickerComponent.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.any.isRequired,
};

export const DatePicker = withTheme(DatePickerComponent);
