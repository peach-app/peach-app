import gql from 'graphql-tag';

export default gql`
  query($id: ID!) {
    findCampaignByID(id: $id) {
      name
      description
      user {
        name
        email
        avatar {
          url
        }
      }
    }
  }
`;
