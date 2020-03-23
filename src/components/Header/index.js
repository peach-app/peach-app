import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { Main, Wrapper, Action, MainTitle, RightAction } from './styles';
import { BackButton } from '../BackButton';

export const Header = ({ title, rightActionLabel, onRightActionPressed }) => (
  <Main>
    <Wrapper>
      <Action>
        <BackButton />
      </Action>
      {Boolean(title) && <MainTitle numberOfLines={1}>{title}</MainTitle>}
      {Boolean(rightActionLabel) && (
        <Action isRight onPress={onRightActionPressed} as={TouchableOpacity}>
          <RightAction>{rightActionLabel}</RightAction>
        </Action>
      )}
    </Wrapper>
  </Main>
);

Header.defaultProps = {
  title: null,
  rightActionLabel: null,
  onRightActionPressed: null,
};

Header.propTypes = {
  title: PropTypes.string,
  rightActionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onRightActionPressed: PropTypes.func,
};
