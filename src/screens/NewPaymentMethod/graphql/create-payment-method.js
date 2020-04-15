import gql from 'graphql-tag';

export default gql`
  mutation($token: String!) {
    createPaymentMethod(token: $token)
  }
`;
