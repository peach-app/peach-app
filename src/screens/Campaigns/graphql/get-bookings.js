import gql from 'graphql-tag';

export default gql`
  {
    user {
      type
      bookings {
        data {
          _id
          cost
          user {
            name
            avatar {
              url
            }
          }
        }
      }
    }
  }
`;
