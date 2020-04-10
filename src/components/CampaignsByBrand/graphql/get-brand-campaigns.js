import gql from 'graphql-tag';
import { CampaignCardFragment } from '../../CampaignCard';

export default gql`
  ${CampaignCardFragment}

  query getBrandCampaigns($id: ID!, $after: [RefInput]) {
    findCampaignsByBrand(id: $id, after: $after) {
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
