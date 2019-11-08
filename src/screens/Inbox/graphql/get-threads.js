import gql from 'graphql-tag';

import { ThreadCardFragment } from '../../../components/ThreadCard';

export default gql`
  ${ThreadCardFragment}

  {
    threads {
      data {
        ...ThreadCardFragment
      }
    }
  }
`;
