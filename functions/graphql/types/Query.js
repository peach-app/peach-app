const { gql } = require("apollo-server-lambda");

module.exports = gql`
  type Query {
    user: User
  }
`;
