import gql from 'graphql-tag';

import { BillingMethodCardFragment } from '../../BillingMethodCard';

export default gql`
  ${BillingMethodCardFragment}

  query getPaymentMethods {
    user {
      _id
      stripeAccount {
        id
        paymentMethods {
          data {
            ...BillingMethodCardFragment
          }
        }
      }
    }
  }
`;
