import gql from 'graphql-tag';

import { ProfileHeaderFragment } from '../../components';

export default gql`
  ${ProfileHeaderFragment}

  query getCurrentUser {
    user {
      _id
      type
      onboarded
      ...ProfileHeaderFragment
    }
  }
`;
