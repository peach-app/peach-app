import React from 'react';
import PropTypes from 'prop-types';

import { Main, Wrapper, Action, MainTitle } from './styles';
import BackButton from '../../components/BackButton';

export const Header = ({ title }) => (
  <Main>
    <Wrapper>
      <Action>
        <BackButton />
      </Action>
      {!!title && <MainTitle numberOfLines={1}>{title}</MainTitle>}
    </Wrapper>
  </Main>
);

Header.defaultProps = {
  title: null,
};

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
