import gql from 'graphql-tag';

import { USER_TYPE } from '../../../consts';
import { SlimUserCardFragment } from '../../../components/SlimUserCard';

export default gql`
  ${SlimUserCardFragment}

  {
    discover {
      popularUsers(type: ${USER_TYPE.INFLUENCER}) {
        data {
          _id
          ...SlimUserCardFragment
        }
      }
    }
  }
`;
