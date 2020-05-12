import gql from 'graphql-tag';

export default gql`
  mutation($cost: Int!, $token: String, $selectedId: String) {
    createPayment(cost: $cost, token: $token, selectedId: $selectedId) {
      id
      redirectUrl
    }
  }
`;
