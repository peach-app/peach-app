import gql from 'graphql-tag';

export default gql`
  mutation($id: ID!, $token: String!) {
    updateUser(id: $id, data: { pushToken: $token }) {
      _id
    }
  }
`;
