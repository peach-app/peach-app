import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { Grid } from '../Grid';

const Icon = styled(Ionicons).attrs(props => ({
  color: props.theme.foreground,
  size: 32,
}))``;

export const AddRemoveAction = ({ isActioned }) => (
  <Grid.Item width={50}>
    <Icon
      name={
        isActioned ? 'ios-checkmark-circle-outline' : 'ios-add-circle-outline'
      }
    />
  </Grid.Item>
);

AddRemoveAction.propTypes = {
  isActioned: PropTypes.bool.isRequired,
};
