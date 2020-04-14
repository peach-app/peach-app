import gql from 'graphql-tag';

import { ProfileHeaderFragment } from 'components';

export default gql`
  ${ProfileHeaderFragment}

  query($id: ID!) {
    findUserByID(id: $id) {
      ...ProfileHeaderFragment
      bio
      type
      socialAccounts {
        instagram
        twitter
        facebook
        youTube
        tikTok
      }
    }
  }
`;
