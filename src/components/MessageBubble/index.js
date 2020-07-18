import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Hyperlink from 'react-native-hyperlink';

import { Text } from '../Text';
import { useTheme } from '../../theme-provider';
import { Main, Bubble } from './styles';

export const MessageBubble = ({ sentBySelf, text }) => {
  const theme = useTheme();

  return (
    <Main isSelf={sentBySelf}>
      <Bubble isSelf={sentBySelf}>
        <Hyperlink linkDefault linkStyle={{ color: theme.brand }}>
          <Text selectable>{text}</Text>
        </Hyperlink>
      </Bubble>
    </Main>
  );
};

MessageBubble.propTypes = {
  sentBySelf: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export const MessageBubbleFragment = gql`
  fragment MessageBubbleFragment on Message {
    text
    sentBySelf
  }
`;
