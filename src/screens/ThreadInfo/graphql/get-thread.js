import gql from 'graphql-tag';

import { UserProfileCardFragment } from 'components';

export default gql`
  ${UserProfileCardFragment}

  query getThreadInfo($id: ID!) {
    findThreadById(id: $id) {
      users {
        data {
          _id
          ...UserProfileCardFragment
        }
      }
    }
  }
`;
