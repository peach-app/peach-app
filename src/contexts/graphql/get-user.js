import gql from 'graphql-tag';

import { ProfileHeaderFragment } from '../../components/ProfileHeader';

export default gql`
  ${ProfileHeaderFragment}

  {
    user {
      _id
      type
      pushToken
      ...ProfileHeaderFragment
    }
  }
`;
