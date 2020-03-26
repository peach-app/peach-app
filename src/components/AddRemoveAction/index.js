import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

const Icon = styled(Ionicons).attrs(props => ({
  color: props.theme.foreground,
  size: 32,
}))``;

export const AddRemoveAction = ({ isActioned }) => (
  <Icon
    name={
      isActioned ? 'ios-checkmark-circle-outline' : 'ios-add-circle-outline'
    }
  />
);

AddRemoveAction.propTypes = {
  isActioned: PropTypes.bool.isRequired,
};
