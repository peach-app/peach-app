import React from 'react';
import PropTypes from 'prop-types';

import { Avatar } from '../Avatar';
import { Main, Fallback, Image } from './styles';

export const ProgressiveImage = ({ source, fallback, isBrand, isLoading }) => (
  <Main>
    {source.uri && !isBrand ? (
      <Image source={source} />
    ) : (
      <Fallback>
        <Avatar
          size={120}
          fallback={fallback}
          source={source}
          isLoading={isLoading}
        />
      </Fallback>
    )}
  </Main>
);

ProgressiveImage.defaultProps = {
  fallback: null,
  source: null,
  isBrand: false,
  isLoading: false,
};

ProgressiveImage.propTypes = {
  fallback: PropTypes.string,
  source: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ uri: PropTypes.string }),
  ]),
  isBrand: PropTypes.bool,
  isLoading: PropTypes.bool,
};
