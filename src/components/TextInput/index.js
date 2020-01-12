import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import Text from '../Text';

const Input = styled.TextInput`
  border-width: 1px;
  color: ${props => props.theme.foreground};
  border-color: ${props =>
    props.hasError ? props.theme.error : props.theme.grey};
  border-radius: ${props => props.theme.radius}px;
  padding: ${props => props.theme.spacingSmall}px
    ${props => props.theme.spacing}px;
  min-height: 38px;
  font-family: futura-book;
`;

const Label = styled(Text)`
  margin-vertical: ${props => props.theme.spacingSmall}px;
`;

export const TextInput = ({ label, error, ...props }) => (
  <>
    {label && <Label>{label}</Label>}
    <Input hasError={error} {...props} />
    {error && <Label>{error}</Label>}
  </>
);

TextInput.defaultProps = {
  label: null,
  error: null,
};

TextInput.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
};

export default TextInput;
