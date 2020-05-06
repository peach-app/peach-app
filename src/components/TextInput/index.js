import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import { Label } from '../Label';

const Input = styled.TextInput`
  border-width: 1px;
  color: ${props => props.theme.foreground};
  border-color: ${props =>
    props.hasError ? props.theme.error : props.theme.grey};
  border-radius: ${props => props.theme.radius}px;
  padding: ${props => props.theme.spacingSmall}px
    ${props => props.theme.spacing}px;
  min-height: 38px;
  font-family: ${props => props.theme.fontFamily.regular};
  background: ${props => props.theme.background};
`;

export const TextInput = ({ label, error, ...props }) => (
  <View>
    {label && <Label>{label}</Label>}
    <Input hasError={error} {...props} />
    {error && <Label isError>{error}</Label>}
  </View>
);

TextInput.defaultProps = {
  label: null,
  error: null,
};

TextInput.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
};
