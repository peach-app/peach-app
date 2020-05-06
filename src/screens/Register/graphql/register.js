import gql from 'graphql-tag';

export default gql`
  mutation(
    $code: String!
    $name: String!
    $email: String!
    $password: String!
    $type: UserType!
    $idempotencyKey: String!
  ) {
    register(
      code: $code
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
