import gql from 'graphql-tag';

export default gql`
  mutation($campaignId: ID!) {
    declineBooking(campaignId: $campaignId)
  }
`;
