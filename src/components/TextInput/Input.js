import React from 'react';
import styled from 'styled-components/native';


import Text from '../Text';

const Input = styled.TextInput`
  border-width: 1px;
  color: ${props => props.theme.foreground};
  border-color: ${props => (props.hasError ? props.theme.error : props.theme.grey)};
  border-radius: ${props => props.theme.radius}px;
  padding: 0 ${props => props.theme.spacing}px;
  min-height: 38px;
  font-family: futura-book;
`;

const Label = styled(Text)`
  margin-vertical: ${props => props.theme.spacingSmall}px;
`;

const TextInput = ({ label, onChangeText, error,  ...props }) => (
  <>
    {label && <Label>{label}</Label>}
    <Input
      {...props}
      onChangeText={onChangeText}
      hasError={error}
    />
    {error && <Label>{error}</Label>}
  </>
);

export default TextInput;
