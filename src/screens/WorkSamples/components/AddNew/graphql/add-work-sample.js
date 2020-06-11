import gql from 'graphql-tag';

export default gql`
  mutation($media: MediaInput!) {
    addWorkSample(media: $media)
  }
`;
