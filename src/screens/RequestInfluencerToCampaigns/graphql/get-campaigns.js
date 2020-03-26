import gql from 'graphql-tag';

import { CampaignCardFragment } from 'components';

export default gql`
  ${CampaignCardFragment}

  query($id: ID!, $after: [RefInput]) {
    findCampaignsWithoutUserBookings(id: $id, size: 20, after: $after) {
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
