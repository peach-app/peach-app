import gql from 'graphql-tag';

export default gql`
  mutation($campaign: CampaignInput) {
    createCampaign(campaign: $campaign) {
      _id
    }
  }
`;
