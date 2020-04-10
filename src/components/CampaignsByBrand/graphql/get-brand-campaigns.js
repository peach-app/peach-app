import gql from 'graphql-tag';

export default gql`
  query getBrandCampaigns($id: ID!) {
    findCampaignsByBrand(id: $id) {
      name
    }
  }
`;
