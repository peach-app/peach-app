import gql from 'graphql-tag';
import { CampaignCardFragment } from '../../CampaignCard';

export default gql`
  ${CampaignCardFragment}

  query getBrandCampaigns($id: ID!) {
    findCampaignsByBrand(id: $id, size: 10) {
      data {
        _id
        ...CampaignCardFragment
      }
    }
  }
`;
