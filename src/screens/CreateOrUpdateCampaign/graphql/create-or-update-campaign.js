import gql from 'graphql-tag';

export default gql`
  mutation($campaign: CampaignInput) {
    createOrUpdateCampaign(campaign: $campaign) {
      _id
    }
  }
`;
