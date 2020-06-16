import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';

import { BackButton } from '../BackButton';

import {
  Main,
  Wrapper,
  Action,
  MainTitle,
  RightAction,
  RightIcon,
} from './styles';

export const Header = ({
  title,
  rightActionLabel,
  rightActionIcon,
  onRightActionPressed,
}) => (
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
      {Boolean(rightActionIcon) && (
        <Action isRight onPress={onRightActionPressed} as={TouchableOpacity}>
          <RightIcon name={rightActionIcon} />
        </Action>
      )}
    </Wrapper>
  </Main>
);

Header.defaultProps = {
  title: null,
  rightActionLabel: null,
  onRightActionPressed: null,
  rightActionIcon: null,
};

Header.propTypes = {
  title: PropTypes.string,
  rightActionLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onRightActionPressed: PropTypes.func,
  rightActionIcon: PropTypes.string,
};
