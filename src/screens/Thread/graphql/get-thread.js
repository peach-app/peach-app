import gql from 'graphql-tag';

export default gql`
  query($id: ID!) {
    findThreadByID(id: $id) {
      users {
        data {
          _id
          name
          email
        }
      }
    }
  }
`;
