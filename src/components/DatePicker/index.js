import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FormatDate from 'date-fns/format';

import { Touchable, Spacer, Main, Content } from './styles';
import { Button } from '../Button';
import { Actions } from '../Actions';
import { TextInput } from '../TextInput';

export const DatePicker = ({ label, error, value, onChange, ...props }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Touchable onPress={() => setOpen(true)}>
        <TextInput
          value={FormatDate(value, 'dd/MM/yyyy')}
          editable={false}
          label={label}
          error={error}
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
              value={value}
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
};

DatePicker.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  value: PropTypes.any.isRequired,
};
