import gql from 'graphql-tag';

export default gql`
  mutation($id: ID!, $state: BookingState!, $cardId: ID, $token: String) {
    updateBookingState(id: $id, state: $state, cardId: $cardId, token: $token)
  }
`;
