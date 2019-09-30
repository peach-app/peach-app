const { gql } = require("apollo-server-lambda");

module.exports = gql`
  type Auth {
    jwt: String!
  }
`;
