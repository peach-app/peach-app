import gql from 'graphql-tag';

export default gql`
  mutation($id: ID!, $note: String) {
    completeBooking(id: $id, note: $note)
  }
`;
