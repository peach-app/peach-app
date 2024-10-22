import gql from 'graphql-tag';

import { CampaignCardFragment } from 'components';

export default gql`
  ${CampaignCardFragment}

  query getCampaigns($state: BookingState, $after: [RefInput]) {
    campaigns(state: $state, size: 20, after: $after) {
      pendingBookingsToAction
      data {
        _id
        ...CampaignCardFragment
      }
      after {
        id
        collection {
          id
        }
      }
    }
  }
`;
