import gql from 'graphql-tag';

export default gql`
  mutation($token: String!) {
    createBillingMethod(token: $token)
  }
`;
