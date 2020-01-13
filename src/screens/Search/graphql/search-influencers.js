import gql from 'graphql-tag';

import { USER_TYPE } from '../../../consts';
import { UserCardFragment } from '../../../components';

export default gql`
  ${UserCardFragment}

  query ($query: String!){
    searchUsers(type: ${USER_TYPE.INFLUENCER}, query: $query){
      data {
        _id
        ...UserCardFragment
      }
    }
  }
`;
