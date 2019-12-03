import gql from 'graphql-tag';

import { CampaignCardFragment } from '../../../components/CampaignCard';

export default gql`
  ${CampaignCardFragment}

  query getCampaigns($state: BookingState!) {
    campaigns(state: $state) {
      data {
        _id
        ...CampaignCardFragment
      }
    }
  }
`;
