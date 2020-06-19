import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Hyperlink from 'react-native-hyperlink';

import { useTheme } from '../../theme-provider';
import { Main, Bubble, Text } from './styles';

export const MessageBubble = ({ sentBySelf, text }) => {
  const theme = useTheme();

  return (
    <Main isSelf={sentBySelf}>
      <Bubble isSelf={sentBySelf}>
        <Hyperlink
          linkDefault
          linkStyle={{ color: !sentBySelf ? theme.brand : theme.white }}
        >
          <Text isSelf={sentBySelf} selectable>
            {text}
          </Text>
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
