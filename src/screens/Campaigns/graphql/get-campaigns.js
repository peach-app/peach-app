import gql from 'graphql-tag';

export default gql`
  {
    user {
      campaigns {
        data {
          _id
          name
          description
        }
      }
    }
  }
`;
