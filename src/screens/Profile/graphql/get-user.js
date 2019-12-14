import gql from 'graphql-tag';

import { ProfileHeaderFragment } from '../../../components/ProfileHeader';

export default gql`
  ${ProfileHeaderFragment}

  query($id: ID!) {
    findUserByID(id: $id) {
      ...ProfileHeaderFragment
      bio
    }
  }
`;
