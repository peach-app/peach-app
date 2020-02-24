import gql from 'graphql-tag';

export default gql`
  {
    user {
      _id
      stripeAccount {
        id
      }
    }
  }
`;
