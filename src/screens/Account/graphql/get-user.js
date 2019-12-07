import gql from 'graphql-tag';

import { ProfileHeaderFragment } from '../../../components/ProfileHeader';

export default gql`
  ${ProfileHeaderFragment}

  query getUser {
    user {
      _id
      ...ProfileHeaderFragment
    }
  }
`;
