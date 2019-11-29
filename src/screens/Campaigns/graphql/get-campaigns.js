import gql from 'graphql-tag';

import { CampaignCardFragment } from '../../../components/CampaignCard';

export default gql`
  ${CampaignCardFragment}

  query($state: BookingState!) {
    campaigns(state: $state) {
      data {
        _id
        ...CampaignCardFragment
      }
    }
  }
`;
