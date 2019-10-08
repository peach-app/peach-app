import React from 'react';
import PropTypes from 'prop-types';

import { Main, Title, Icon } from './styles';

const NavLink = ({ title, iconProps, ...props }) => (
  <Main {...props}>
    <Title>{title}</Title>
    {iconProps && <Icon {...iconProps} size={20} />}
  </Main>
);

NavLink.propTypes = {
  title: PropTypes.string.isRequired,
  iconProps: PropTypes.object,
};

export default NavLink;
