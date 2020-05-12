import gql from 'graphql-tag';

export default gql`
  mutation(
    $reason: PaymentReason!
    $bookingId: ID
    $token: String
    $selectedId: String
  ) {
    createPayment(
      reason: $reason
      bookingId: $bookingId
      token: $token
      selectedId: $selectedId
    ) {
      id
      redirectUrl
    }
  }
`;
