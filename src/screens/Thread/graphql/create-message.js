import gql from 'graphql-tag';

export default gql`
  mutation($threadId: ID!, $text: String!) {
    createMessage(threadId: $threadId, text: $text) {
      _id
    }
  }
`;
