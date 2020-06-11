import gql from 'graphql-tag';

export default gql`
  query getWorkSamples {
    user {
      _id
      workSamples {
        _id
        media {
          url(options: "w_100,h_100,c_fill")
        }
      }
    }
  }
`;
