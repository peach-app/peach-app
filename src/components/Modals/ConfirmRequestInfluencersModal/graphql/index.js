import gql from 'graphql-tag';

export default gql`
  mutation($requestedInfluencers: [ID!], $campaignId: ID!) {
    requestInfluencers(
      requestedInfluencers: $requestedInfluencers
      campaignId: $campaignId
    )
  }
`;
