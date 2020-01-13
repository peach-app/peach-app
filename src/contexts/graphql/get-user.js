import gql from 'graphql-tag';

import { ProfileHeaderFragment } from '../../components';

export default gql`
  ${ProfileHeaderFragment}

  {
    user {
      _id
      type
      ...ProfileHeaderFragment
    }
  }
`;
