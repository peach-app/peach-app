import React from 'react';
import PropTypes from 'prop-types';

import { Main, Image } from './styles';
import { SkeletonCircle } from '../../components/Skeletons';

const Avatar = ({ size, source, isLoading }) => (
  <SkeletonCircle isLoading={isLoading} size={size}>
    <Main size={size}>{source && <Image source={source} />}</Main>
  </SkeletonCircle>
);

Avatar.defaultProps = {
  size: 60,
};

Avatar.propTypes = {
  isLoading: PropTypes.bool,
  size: PropTypes.number,
  source: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ uri: PropTypes.string }),
  ]),
};

export default Avatar;
