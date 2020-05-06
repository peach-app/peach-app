import React from 'react';
import PropTypes from 'prop-types';

import { Main, Text, Icon } from './styles';

export const Pill = ({ value, icon }) => (
  <Main>
    {icon && <Icon name={icon} size={14} />}
    <Text numberOfLines={1}>{value}</Text>
  </Main>
);

Pill.defaultProps = {
  icon: null,
};

Pill.propTypes = {
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
};
