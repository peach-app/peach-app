import React from 'react';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

import { Main, Title } from './styles';

const NavLink = ({ title, ...props }) => (
  <Main {...props}>
    <Title>{title}</Title>
    <Ionicons name="ios-arrow-forward" size={18} />
  </Main>
);

NavLink.propTypes = {
  title: PropTypes.string.isRequired,
};

export default NavLink;
