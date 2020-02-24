import gql from 'graphql-tag';

export default gql`
  mutation($token: String!) {
    updatePaymentDetails(token: $token)
  }
`;
