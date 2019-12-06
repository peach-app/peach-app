import React from 'react';
import styled from 'styled-components/native';

import Text from '../Text';

const Input = styled.TextInput`
  border-width: 1px;
  color: ${props => props.theme.foreground};
  border-color: ${props =>
    props.hasError ? props.theme.error : props.theme.grey};
  border-radius: ${props => props.theme.radius}px;
  padding: 0 ${props => props.theme.spacing}px;
  min-height: 38px;
  font-family: futura-book;
`;

const Label = styled(Text)`
  margin-vertical: ${props => props.theme.spacingSmall}px;
`;

const InputRef = React.forwardRef((props, ref) => (
  <Input ref={ref} {...props} />
));

const TextInput = ({
  label,
  onChangeText,
  error,
  onFocus,
  onBlur,
  onSetRef,
  ...props
}) => (
  <>
    {label && <Label>{label}</Label>}
    <InputRef
      ref={onSetRef}
      {...props}
      onChangeText={onChangeText}
      hasError={error}
      onFocus={onFocus}
      onBlur={onBlur}
    />
    {error && <Label>{error}</Label>}
  </>
);

export default TextInput;
