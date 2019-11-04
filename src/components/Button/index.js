import React from 'react';
import PropTypes from 'prop-types';

import { ActivityIndicator, Main, Title, Loader } from './styles';

const Button = ({ title, isLoading, isGhost, ...props }) => (
  <Main {...props} isGhost={isGhost}>
    <Title isGhost={isGhost} isLoading={isLoading}>
      {title}
    </Title>
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
  isGhost: PropTypes.bool,
};

export default Button;
