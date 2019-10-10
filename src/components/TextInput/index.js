import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { connect } from 'formik';

import Text from '../../components/Text';

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
  margin-bottom: ${props => props.theme.spacingSmall}px;
`;

const TextInput = ({ name, label, formik, ...props }) => (
  <>
    {label && <Label>{label}</Label>}
    <Input
      {...props}
      hasError={formik.errors[name]}
      onChangeText={formik.handleChange(name)}
      onBlur={formik.handleBlur(name)}
      value={formik.values[name]}
    />
  </>
);

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default connect(TextInput);
