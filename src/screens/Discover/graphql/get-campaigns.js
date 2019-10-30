import gql from 'graphql-tag';

import { CampaignCardFragment } from '../../../components/CampaignCard';

export default gql`
  ${CampaignCardFragment}
  {
    discover {
      data {
        _id
        ...CampaignCardFragment
      }
    }
  }
`;
