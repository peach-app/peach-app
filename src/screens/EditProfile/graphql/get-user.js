import gql from 'graphql-tag';

export default gql`
  query getEditUser {
    user {
      _id
      name
      bio
      avatar {
        url
      }
      categories {
        _id
      }
    }
  }
`;
