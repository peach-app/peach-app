import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '../Grid';
import { Text } from '../Text';

import { StyledSwitch } from './styles';

export const Switch = ({ label, value, onValueChange }) => {
  if (label) {
    return (
      <Grid align="center">
        <Grid.Item flex={1}>
          <Text>{label}</Text>
        </Grid.Item>
        <Grid.Item>
          <StyledSwitch onValueChange={onValueChange} value={value} />
        </Grid.Item>
      </Grid>
    );
  }

  return <StyledSwitch onValueChange={onValueChange} value={value} />;
};

Switch.defaultProps = {
  label: null,
  value: null,
};

Switch.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool,
  onValueChange: PropTypes.func.isRequired,
};
