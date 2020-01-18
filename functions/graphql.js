const { ApolloServer } = require('apollo-server-lambda');
const faunadb = require('faunadb');
const q = faunadb.query;

const DocumentDataWithId = require('./helpers/DocumentDataWithId');
const formatRefs = require('./helpers/formatRefs');

const typeDefs = require('./types');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event }) => {
    const [_, secret] = event.headers.authorization.split('Bearer ');

    const client = new faunadb.Client({ secret });

    return {
      DocumentDataWithId,
      formatRefs,
      client,
      q,
    };
  },
});

exports.handler = server.createHandler();
