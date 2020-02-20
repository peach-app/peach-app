import React from 'react';
import PropTypes from 'prop-types';

import { Main, Title, Icon } from './styles';

export const NavLink = ({ title, iconProps, ...props }) => (
  <Main {...props}>
    <Title numberOfLines={1}>{title}</Title>
    {iconProps && <Icon {...iconProps} />}
  </Main>
);

NavLink.defaultProps = {
  iconProps: null,
};

NavLink.propTypes = {
  title: PropTypes.string.isRequired,
  iconProps: PropTypes.object,
};
