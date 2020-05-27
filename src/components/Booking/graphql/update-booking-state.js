import gql from 'graphql-tag';

export default gql`
  mutation($id: ID!, $state: BookingState!, $paymentId: String) {
    updateBookingState(id: $id, state: $state, paymentId: $paymentId)
  }
`;
