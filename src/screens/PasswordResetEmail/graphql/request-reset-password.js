import gql from 'graphql-tag';

export default gql`
  mutation($email: String!) {
    requestPasswordReset(email: $email)
  }
`;
