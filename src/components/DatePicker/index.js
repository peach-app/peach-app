import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FormatDate from 'date-fns/format';

import { Touchable, Spacer, Main, Content } from './styles';
import { Button } from '../Button';
import { Actions } from '../Actions';
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

      <Modal
        visible={open}
        presentationStyle="overFullScreen"
        transparent
        animationType="fade"
      >
        <Main>
          <Content>
            <DateTimePicker
              value={value || today}
              onChange={(_, selectedDate) => {
                onChange(selectedDate);
              }}
              {...props}
            />
            <Actions>
              <Button title="Done" onPress={() => setOpen(false)} fixedWidth />
            </Actions>
          </Content>
        </Main>
      </Modal>
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
