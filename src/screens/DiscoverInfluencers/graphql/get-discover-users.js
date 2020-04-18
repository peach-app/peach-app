import gql from 'graphql-tag';

import { USER_TYPE } from 'consts';
import { UserProfileCardFragment } from 'components';

export default gql`
  ${UserProfileCardFragment}

  {
    discover {
      popularUsers(type: ${USER_TYPE.INFLUENCER}) {
        data {
          _id
          ...UserProfileCardFragment
        }
      }
    }
  }
`;
