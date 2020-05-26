import gql from 'graphql-tag';

import { BookingFragment } from 'components';

export default gql`
  ${BookingFragment}

  query getCampaign(
    $id: ID!
    $bookingsState: BookingState
    $isBrand: Boolean!
    $isInfluencer: Boolean!
  ) {
    findCampaignById(id: $id) {
      name
      description
      dueDate
      budget
      unpaid
      user {
        _id
        name
        avatar @include(if: $isInfluencer) {
          url
        }
      }
      userBooking {
        _id
        state
      }
      bookings(state: $bookingsState) @include(if: $isBrand) {
        data {
          _id
          ...BookingFragment
        }
      }
    }
  }
`;
