import React from 'react';
import PropTypes from 'prop-types';

import { formatToMoneyFromPence, formatToPenceFromMoney } from 'helpers';

import { TextInput } from '../TextInput';
import { Main } from './styles';

export const MoneyInput = ({ value, onChange, label, error, ...props }) => (
  <Main>
    <TextInput
      label={label}
      error={error}
      keyboardType="decimal-pad"
      value={formatToMoneyFromPence(value)}
      onChangeText={v => {
        console.log(formatToPenceFromMoney(v));
        onChange(formatToPenceFromMoney(v));
      }}
      {...props}
    />
  </Main>
);

MoneyInput.defaultProps = {
  label: null,
  error: null,
};

MoneyInput.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
};
