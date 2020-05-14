import gql from 'graphql-tag';

import { USER_TYPE } from 'consts';
import { UserCardFragment } from '../../UserCard';

export default gql`
  ${UserCardFragment}

  query ($query: String!, $campaignId: String){
    searchUsers(type: ${USER_TYPE.INFLUENCER}, query: $query, campaignId: $campaignId){
      data {
        _id
        ...UserCardFragment
      }
    }
  }
`;
