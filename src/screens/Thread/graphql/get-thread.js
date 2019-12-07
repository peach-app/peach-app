import gql from 'graphql-tag';

import { MessageBubbleFragment } from '../../../components/MessageBubble';

export default gql`
  ${MessageBubbleFragment}

  query getThread($id: ID!) {
    findThreadById(id: $id) {
      users {
        data {
          _id
          name
        }
      }
      messages {
        data {
          _id
          ...MessageBubbleFragment
        }
      }
    }
  }
`;
