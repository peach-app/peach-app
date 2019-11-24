import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import { Main, Bubble, Text } from './styles';

const MessageBubble = ({ sentBySelf, text }) => (
  <Main isSelf={sentBySelf}>
    <Bubble isSelf={sentBySelf}>
      <Text isSelf={sentBySelf} selectable>
        {text}
      </Text>
    </Bubble>
  </Main>
);

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

export default MessageBubble;
