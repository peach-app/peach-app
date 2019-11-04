import React from 'react';
import PropTypes from 'prop-types';

import { Main, Action, MainTitle } from './styles';
import BackButton from '../../components/BackButton';

const Header = ({ title }) => (
  <Main>
    <Action>
      <BackButton />
    </Action>
    {title && <MainTitle numberOfLines={1}>{title}</MainTitle>}
  </Main>
);

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
