import gql from 'graphql-tag';

export default gql`
  mutation($id: ID!, $state: BookingState!) {
    updateBookingState(id: $id, state: $state)
  }
`;
