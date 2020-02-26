import gql from 'graphql-tag';

export default gql`
  {
    user {
      _id
      email
      stripeAccount {
        id
        individual {
          id
          first_name
          last_name
          address {
            city
            line1
            line2
            postal_code
          }
          dob {
            day
            month
            year
          }
        }
      }
    }
  }
`;
