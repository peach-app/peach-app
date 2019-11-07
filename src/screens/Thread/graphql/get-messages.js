import gql from 'graphql-tag';

import { MessageBubbleFragment } from '../../../components/MessageBubble';

export default gql`
  ${MessageBubbleFragment}

  query($id: ID!) {
    findThreadByID(id: $id) {
      messages(_size: 100) {
        data {
          _id
          user {
            _id
          }
          ...MessageBubbleFragment
        }
      }
    }
  }
`;
