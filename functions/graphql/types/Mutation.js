const { gql } = require("apollo-server-lambda");

module.exports = gql`
  type Mutation {
    register(email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;
