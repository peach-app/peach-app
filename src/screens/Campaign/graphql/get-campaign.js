import gql from 'graphql-tag';

export default gql`
  query($id: ID!) {
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
