import gql from 'graphql-tag';

export default gql`
  mutation($userId: ID!, $password: String!) {
    resetPassword(userId: $userId, password: $password)
  }
`;
