import React from 'react';
import PropTypes from 'prop-types';

import { Touchable, Icon } from './styles';

const IconButton = ({ onPress, size, name }) => (
  <Touchable onPress={onPress} size={size}>
    <Icon size={size} name={name} />
  </Touchable>
);

IconButton.propTypes = {
  size: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default IconButton;
