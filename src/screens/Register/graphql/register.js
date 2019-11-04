import gql from 'graphql-tag';

export default gql`
  mutation($email: String!, $password: String!, $type: UserType!) {
    register(email: $email, password: $password, type: $type) {
      secret
    }
  }
`;
