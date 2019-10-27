import gql from 'graphql-tag';

import { CampaignCardFragment } from '../../../components/CampaignCard';

export default gql`
  ${CampaignCardFragment}
  {
    user {
      type
      campaigns {
        data {
          _id
          ...CampaignCardFragment
        }
      }
      bookings {
        data {
          _id
          cost
          user {
            name
            email
            avatar {
              url
            }
          }
        }
      }
    }
  }
`;
