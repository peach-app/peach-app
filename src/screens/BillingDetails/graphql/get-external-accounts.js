import gql from 'graphql-tag';

export default gql`
  {
    user {
      _id
      stripeAccount {
        id
        external_accounts {
          data {
            id
            last4
            routing_number
            account_holder_name
          }
        }
      }
    }
  }
`;
