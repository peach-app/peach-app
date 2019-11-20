const gql = require('graphql-tag');

module.exports = gql`
  type Query {
    user: User
  }

  enum UserType {
    BRAND
    INFLUENCER
  }

  type Media {
    url: String!
  }

  type User {
    _id: ID!
    name: String
    avatar: Media
    email: String!
    type: UserType!
  }
`;
