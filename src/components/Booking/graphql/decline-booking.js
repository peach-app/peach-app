import gql from 'graphql-tag';

import { BOOKING_STATE } from 'consts';

export default gql`
  mutation($id: ID!) {
    updateBookingState(id: $id, state: ${BOOKING_STATE.DECLINED})
  }
`;
