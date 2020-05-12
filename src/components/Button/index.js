import React from 'react';
import PropTypes from 'prop-types';

import { ActivityIndicator, Main, Title, Loader } from './styles';

export const Button = ({
  title,
  isLoading,
  isGhost,
  isSmall,
  disabled,
  ...props
}) => (
  <Main
    {...props}
    isGhost={isGhost}
    isSmall={isSmall}
    disabled={isLoading || disabled}
  >
    <Title isGhost={isGhost} isLoading={isLoading}>
      {title}
    </Title>
    {isLoading && (
      <Loader>
        <ActivityIndicator isGhost={isGhost} />
      </Loader>
    )}
  </Main>
);

Button.defaultProps = {
  isLoading: false,
  isGhost: false,
  isSmall: false,
  isDark: false,
  isShaded: false,
  fixedWidth: false,
  disabled: false,
};

Button.propTypes = {
  isLoading: PropTypes.bool,
  title: PropTypes.string.isRequired,
  isGhost: PropTypes.bool,
  isSmall: PropTypes.bool,
  isDark: PropTypes.bool,
  isShaded: PropTypes.bool,
  fixedWidth: PropTypes.bool,
  disabled: PropTypes.bool,
};
