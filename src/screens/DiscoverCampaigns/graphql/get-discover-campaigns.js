import gql from 'graphql-tag';

import { CampaignCardFragment } from '../../../components';

export default gql`
  ${CampaignCardFragment}

  query($after: [RefInput]) {
    discover {
      campaigns(size: 20, after: $after) {
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
  }
`;
