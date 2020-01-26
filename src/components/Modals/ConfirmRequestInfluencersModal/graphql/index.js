import gql from 'graphql-tag';

export default gql`
  mutation($user: [UserInput], $id: ID!) {
    requestInfluencers(user: $user, id: $id) {
      _id
    }
  }
`;
