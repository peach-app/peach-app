import gql from 'graphql-tag';

export default gql`
  mutation($campaign: CampaignInput, $paymentMethod: ID) {
    createOrUpdateCampaign(campaign: $campaign, paymentMethod: $paymentMethod) {
      _id
    }
  }
`;
