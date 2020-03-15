import gql from 'graphql-tag';

export default gql`
  mutation($influencerId: ID!, $campaigns: [ID!]) {
    requestInfluencerToCampaigns(
      influencerId: $influencerId
      campaigns: $campaigns
    )
  }
`;
