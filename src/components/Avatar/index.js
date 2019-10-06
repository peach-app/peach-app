import React from 'react';
import PropTypes from 'prop-types';

import { Main, Image } from './styles';

const Avatar = ({ size, source }) => (
  <Main size={size}>{source && <Image source={source} />}</Main>
);

Avatar.defaultProps = {
  size: 60,
};

Avatar.propTypes = {
  size: PropTypes.number,
  source: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({ uri: PropTypes.string }),
  ]),
};

export default Avatar;
