import gql from 'graphql-tag';

export default gql`
  query getUser {
    user {
      _id
      name
    }
  }
`;
