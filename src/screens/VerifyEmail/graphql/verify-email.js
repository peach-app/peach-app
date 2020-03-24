import gql from 'graphql-tag';

export default gql`
  mutation($emailVerificationToken: String!) {
    verifyEmail(emailVerificationToken: $emailVerificationToken)
  }
`;
