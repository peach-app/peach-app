import gql from 'graphql-tag';

import { CampaignCardFragment } from '../../../components/CampaignCard';

export default gql`
  ${CampaignCardFragment}
  {
    campaigns {
      _id
      ...CampaignCardFragment
    }
  }
`;
