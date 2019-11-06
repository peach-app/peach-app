import gql from 'graphql-tag';

export default gql`
  query($id: ID!) {
    findThreadByID(id: $id) {
      messages {
        data {
          _id
          text
        }
      }
    }
  }
`;
