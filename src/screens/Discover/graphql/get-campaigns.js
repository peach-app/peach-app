import gql from 'graphql-tag';

import { CampaignCardFragment } from '../../../components/CampaignCard';

export default gql`
  ${CampaignCardFragment}
  {
    discover {
      _id
      ...CampaignCardFragment
    }
  }
`;
