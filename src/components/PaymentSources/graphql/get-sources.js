import gql from 'graphql-tag';

import { BillingMethodCardFragment } from '../../BillingMethodCard';

export default gql`
  ${BillingMethodCardFragment}

  {
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
