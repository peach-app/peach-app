import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';

import { Main, Bubble, Text } from './styles';

const MessageBubble = ({ isSelf, text }) => (
  <Main isSelf={isSelf}>
    <Bubble isSelf={isSelf}>
      <Text isSelf={isSelf} selectable>
        {text}
      </Text>
    </Bubble>
  </Main>
);

MessageBubble.propTypes = {
  isSelf: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

export const MessageBubbleFragment = gql`
  fragment MessageBubbleFragment on Message {
    text
  }
`;

export default MessageBubble;
