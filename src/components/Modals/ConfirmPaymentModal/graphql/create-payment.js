import gql from 'graphql-tag';

export default gql`
  mutation(
    $reason: PaymentReason!
    $bookingId: ID
    $token: String
    $selectedId: String
    $promoCode: String
  ) {
    createPayment(
      reason: $reason
      bookingId: $bookingId
      token: $token
      selectedId: $selectedId
      promoCode: $promoCode
    ) {
      id
      redirectUrl
    }
  }
`;
