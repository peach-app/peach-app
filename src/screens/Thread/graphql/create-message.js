import gql from 'graphql-tag';

export default gql`
  mutation($body: any) {
    createMessage(body: $body)
      @rest(
        method: "POST"
        type: "Message"
        path: "/send-message"
        bodyKey: "body"
      ) {
      _id
    }
  }
`;
