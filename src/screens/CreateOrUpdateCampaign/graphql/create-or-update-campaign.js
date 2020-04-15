import gql from 'graphql-tag';

export default gql`
  mutation($campaign: CampaignInput, $cardId: ID, $token: String) {
    createOrUpdateCampaign(
      campaign: $campaign
      cardId: $cardId
      token: $token
    ) {
      _id
    }
  }
`;
