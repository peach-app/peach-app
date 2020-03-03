import gql from 'graphql-tag';

export default gql`
  {
    user {
      _id
      stripeAccount {
        charges_enabled
        transfers_enabled
      }
      emailVerification {
        hasVerifiedEmail
      }
    }
  }
`;
