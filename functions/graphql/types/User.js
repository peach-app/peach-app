const { gql } = require('apollo-server-lambda');

module.exports = gql`
  type User {
    email: String!
  }
`;
