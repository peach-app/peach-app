import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '../Text';

export const AddIcon = styled(Ionicons).attrs(props => ({
  size: 30,
  name: 'ios-add-circle',
  color: props.theme.foreground,
}))`
  align-self: center;
`;

export const AddNewAction = ({ onPress, text }) => (
  <TouchableOpacity onPress={onPress}>
    <AddIcon />
    <Text isCenter>{text}</Text>
  </TouchableOpacity>
);

AddNewAction.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
