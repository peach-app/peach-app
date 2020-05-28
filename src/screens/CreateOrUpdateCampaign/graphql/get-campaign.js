import gql from 'graphql-tag';

export default gql`
  query getCampaign($id: ID!) {
    findCampaignById(id: $id) {
      name
      description
      dueDate
      budget
      private
      unpaid
    }
  }
`;
