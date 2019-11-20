import gql from 'graphql-tag';

export default gql`
  query($id: ID!) {
    findUserByID(id: $id) {
      name
      email
      avatar {
        url
      }
    }
  }
`;
