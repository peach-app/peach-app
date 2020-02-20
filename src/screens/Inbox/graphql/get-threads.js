import gql from 'graphql-tag';

import { ThreadCardFragment } from 'components';

export default gql`
  ${ThreadCardFragment}

  {
    user {
      _id
      threads {
        data {
          ...ThreadCardFragment
        }
      }
    }
  }
`;
