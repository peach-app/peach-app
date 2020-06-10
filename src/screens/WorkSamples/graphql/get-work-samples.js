import gql from 'graphql-tag';

export default gql`
  query getWorkSamples {
    user {
      _id
      workSamples {
        _id
        media {
          url
        }
      }
    }
  }
`;
