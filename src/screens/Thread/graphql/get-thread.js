import gql from 'graphql-tag';

import { MessageBubbleFragment } from 'components';

export default gql`
  ${MessageBubbleFragment}

  query getThread($id: ID!, $after: Float) {
    findThreadById(id: $id) {
      users {
        data {
          _id
          name
        }
      }
      messages(size: 100, after: $after) {
        data {
          _id
          ...MessageBubbleFragment
        }
        after
      }
    }
  }
`;
