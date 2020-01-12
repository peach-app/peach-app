import gql from 'graphql-tag';

export default gql`
  mutation($id: ID!) {
    applyToCampaign(id: $id) {
      state
    }
  }
`;
