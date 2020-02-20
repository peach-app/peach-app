import gql from 'graphql-tag';

import { USER_TYPE } from 'consts';
import { UserCardFragment } from 'components';

export default gql`
  ${UserCardFragment}

  {
    discover {
      popularUsers(type: ${USER_TYPE.INFLUENCER}) {
        data {
          _id
          ...UserCardFragment
        }
      }
    }
  }
`;
