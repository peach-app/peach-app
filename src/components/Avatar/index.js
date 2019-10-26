import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/fp/get';

import { Main, Image, Initial } from './styles';
import { SkeletonCircle } from '../../components/Skeletons';

const Avatar = ({ size, source, fallback, isLoading }) => (
  <SkeletonCircle isLoading={isLoading} size={size}>
    <Main size={size}>
      {get('uri', source) ? (
        <Image source={source} />
      ) : (
        <Initial>{(fallback || '').slice(0, 1).toUpperCase()}</Initial>
      )}
    </Main>
  </SkeletonCircle>
);

Avatar.defaultProps = {
  size: 60,
  fallback: '',
};

Avatar.propTypes = {
  isLoading: PropTypes.bool,
  size: PropTypes.number,
  fallback: PropTypes.string.isRequired,
  source: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ uri: PropTypes.string }),
  ]),
};

export default Avatar;
