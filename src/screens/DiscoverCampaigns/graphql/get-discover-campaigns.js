import gql from 'graphql-tag';

import { CampaignCardFragment } from 'components';

export default gql`
  ${CampaignCardFragment}

  query($after: [RefInput], $type: BudgetType) {
    discover {
      campaigns(size: 20, after: $after, type: $type) {
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
