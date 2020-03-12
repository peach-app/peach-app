import gql from 'graphql-tag';

export default gql`
  mutation($url: String!) {
    updateUserAvatar(url: $url)
  }
`;
