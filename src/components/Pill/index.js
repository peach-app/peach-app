import React from 'react';
import PropTypes from 'prop-types';

import { Main, Text, Icon, List } from './styles';

export const Pill = ({ value, icon, isSmall, isSelected }) => (
  <Main isSmall={isSmall} isSelected={isSelected}>
    {icon && <Icon name={icon} size={14} />}
    <Text numberOfLines={1} isSmall={isSmall} isSelected={isSelected}>
      {value}
    </Text>
  </Main>
);

Pill.defaultProps = {
  icon: null,
  isSmall: false,
  isSelected: false,
};

Pill.propTypes = {
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  isSmall: PropTypes.bool,
  isSelected: PropTypes.bool,
};

Pill.List = List;
