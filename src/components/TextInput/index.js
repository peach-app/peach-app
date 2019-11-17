import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { connect } from 'formik';

import Label from '../Label';

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

const TextInput = ({ name, label, formik, ...props }) => {
  // TO DO:
  // REFACTOR WITH HOOKS
  const error = formik.errors[name];
  return (
    <>
      {label && <Label>{label}</Label>}
      <Input
        {...props}
        hasError={error}
        onChangeText={formik.handleChange(name)}
        onBlur={formik.handleBlur(name)}
        value={formik.values[name]}
      />
      {error && <Label error>{error}</Label>}
    </>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default connect(TextInput);
