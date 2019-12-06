import gql from 'graphql-tag';

export default gql`
  mutation(
    $name: String!
    $email: String!
    $password: String!
    $type: UserType!
  ) {
    register(name: $name, email: $email, password: $password, type: $type) {
      secret
    }
  }
`;
