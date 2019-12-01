import gql from 'graphql-tag';

export default gql`
  query getCampaign($id: ID!) {
    findCampaignById(id: $id) {
      name
      description
      user {
        _id
        name
        email
        avatar {
          url
        }
      }
      userBooking {
        state
      }
    }
  }
`;
