import gql from 'graphql-tag';

export default gql`
  mutation($id: ID!, $cost: Int) {
    applyToCampaign(id: $id, cost: $cost) {
      state
    }
  }
`;
