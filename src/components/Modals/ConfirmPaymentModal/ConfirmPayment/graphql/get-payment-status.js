import gql from 'graphql-tag';

export default gql`
  query getPaymentConfirmationStatus($id: ID!) {
    getPaymentConfirmationStatus(id: $id) {
      id
      status
    }
  }
`;
