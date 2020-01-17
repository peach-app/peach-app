import gql from 'graphql-tag';

import { CampaignCardFragment } from '../../../components/CampaignCard';

export default gql`
  ${CampaignCardFragment}

  query getCampaigns($state: BookingState!, $after: ID) {
    campaigns(state: $state, size: 20, after: $after) {
      data {
        _id
        ...CampaignCardFragment
      }
      after {
        id
      }
    }
  }
`;
