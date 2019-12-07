import gql from 'graphql-tag';

export default gql`
  mutation($name: String) {
    updateUser(name: $name)
  }
`;
