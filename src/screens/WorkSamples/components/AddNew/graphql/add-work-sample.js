import gql from 'graphql-tag';

export default gql`
  mutation($url: String!) {
    addWorkSample(url: $url)
  }
`;
