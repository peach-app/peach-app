import gql from 'graphql-tag';

export default gql`
  mutation($media: MediaInput!) {
    updateUserAvatar(media: $media)
  }
`;
