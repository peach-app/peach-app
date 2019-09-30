const {
  ApolloServer,
  AuthenticationError,
  gql
} = require("apollo-server-lambda");
const faunadb = require("faunadb");
const jwt = require("jsonwebtoken");

const resolvers = require("./resolvers");
const typeDefs = require("./types");

const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: req => {
    const bearerToken = req.event.headers.authorization;

    if (bearerToken) {
      const [, token] = bearerToken.split("Bearer ");

      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);

        return {
          fauna: client,
          user
        };
      } catch (err) {
        throw new AuthenticationError("Invalid auth token.");
      }
    }

    return {
      fauna: client
    };
  }
});

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true
  }
});
