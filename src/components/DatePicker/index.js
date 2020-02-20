import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Touchable, Spacer, Main, Content } from './styles';
import { Button } from '../Button';
import { Actions } from '../Actions';
import { TextInput } from '../TextInput';

export const DatePicker = ({ label, error, value, ...props }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Touchable onPress={() => setOpen(true)}>
        <TextInput
          value={value?.toLocaleDateString()}
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

DatePicker.defaultProps = {
  label: null,
  error: null,
};

DatePicker.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
};
