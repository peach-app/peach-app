import gql from 'graphql-tag';

export default gql`
  query getUserPayouts($after: ID, $before: ID) {
    payouts(size: 6, after: $after, before: $before) {
      has_more
      data {
        id
        amount
        created
        amount_refunded
        status
        payment_method_details {
          card {
            last4
          }
        }
      }
    }
  }
`;
