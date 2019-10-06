import React from 'react';
import PropTypes from 'prop-types';

import { ActivityIndicator, Main, Title, Loader } from './styles';

const Button = ({ title, isLoading, ...props }) => (
  <Main {...props}>
    <Title isLoading={isLoading}>{title}</Title>
    {isLoading && (
      <Loader>
        <ActivityIndicator />
      </Loader>
    )}
  </Main>
);

Button.propTypes = {
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default Button;
