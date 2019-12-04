import React from 'react';
import PropTypes from 'prop-types';

import { ActivityIndicator, Main, Title, Loader } from './styles';

const Button = ({ title, isLoading, isGhost, isSmall, ...props }) => (
  <Main {...props} isGhost={isGhost} isSmall={isSmall}>
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

Button.defaultProps = {
  isLoading: false,
  isGhost: false,
  isSmall: false,
};

Button.propTypes = {
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  isGhost: PropTypes.bool,
  isSmall: PropTypes.bool,
};

export default Button;
