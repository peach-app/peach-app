import gql from 'graphql-tag';

export default gql`
  mutation(
    $name: String!
    $email: String!
    $password: String!
    $type: UserType!
    $idempotencyKey: String!
  ) {
    register(
      name: $name
      email: $email
      password: $password
      type: $type
      idempotencyKey: $idempotencyKey
    ) {
      secret
    }
  }
`;
