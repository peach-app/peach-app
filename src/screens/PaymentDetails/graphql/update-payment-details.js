import gql from 'graphql-tag';

export default gql`
  mutation($cardToken: String!) {
    updatePaymentDetails(cardToken: $cardToken)
  }
`;
