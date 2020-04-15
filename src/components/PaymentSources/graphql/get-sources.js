import gql from 'graphql-tag';

import { BillingMethodCardFragment } from '../../BillingMethodCard';

export default gql`
  ${BillingMethodCardFragment}

  query getPaymentSources {
    user {
      _id
      stripeAccount {
        id
        sources {
          data {
            ...BillingMethodCardFragment
          }
        }
      }
    }
  }
`;
