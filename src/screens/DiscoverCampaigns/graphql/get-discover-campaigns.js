import gql from 'graphql-tag';

import { CampaignCardFragment } from '../../../components/CampaignCard';

export default gql`
  ${CampaignCardFragment}

  query($after: ID) {
    discover {
      campaigns(size: 20, after: $after) {
        data {
          _id
          ...CampaignCardFragment
        }
        after {
          id
        }
      }
    }
  }
`;
