import gql from 'graphql-tag';

import { ProfileHeaderFragment } from 'components';

export default gql`
  ${ProfileHeaderFragment}

  query($id: ID!) {
    findUserByID(id: $id) {
      ...ProfileHeaderFragment
      bio
      type
      hasSocialAccounts
      socialAccounts {
        instagram
        twitter
        facebook
        youTube
        tikTok
      }
      workSamples {
        _id
        media {
          url(options: "w_480,h_480,c_fill")
        }
      }
      categories {
        _id
        name
      }
    }
  }
`;
