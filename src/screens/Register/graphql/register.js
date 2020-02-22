import gql from 'graphql-tag';

export default gql`
  mutation(
    $name: String!
    $email: String!
    $password: String!
    $type: UserType!
    $idempotency_key: String!
  ) {
    register(
      name: $name
      email: $email
      password: $password
      type: $type
      idempotency_key: $idempotency_key
    ) {
      secret
    }
  }
`;
