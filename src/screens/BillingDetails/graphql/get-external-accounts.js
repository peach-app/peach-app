import gql from 'graphql-tag';

import { BillingMethodCardFragment } from 'components';

export default gql`
  ${BillingMethodCardFragment}

  query getExternalAccount {
    user {
      _id
      stripeAccount {
        id
        external_accounts {
          data {
            ...BillingMethodCardFragment
          }
        }
      }
    }
  }
`;
