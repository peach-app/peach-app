import gql from 'graphql-tag';

import { ThreadCardFragment } from '../../../components/ThreadCard';

export default gql`
  ${ThreadCardFragment}

  {
    user {
      threads {
        data {
          ...ThreadCardFragment
        }
      }
    }
  }
`;
