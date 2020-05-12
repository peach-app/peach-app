const { ApolloServer, AuthenticationError } = require('apollo-server-lambda');
const faunadb = require('faunadb');
const q = faunadb.query;

const DocumentDataWithId = require('./helpers/DocumentDataWithId');
const formatRefs = require('./helpers/formatRefs');

const typeDefs = require('./types');
const resolvers = require('./resolvers');

const { FAUNADB_SECRET } = process.env;

if (!FAUNADB_SECRET) {
  console.error(
    `No FAUNADB_SECRET found... \nrun: export FAUNADB_SECRET=SecretKeyHere`
  );
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ event }) => {
    const { authorization } = event.headers;
    const [_, secret] = authorization ? authorization.split('Bearer ') : [];

    const userClient = secret && new faunadb.Client({ secret });
    const activeUserRef = secret && (await userClient.query(q.Identity()));

    if (secret && !activeUserRef) {
      throw new AuthenticationError('user must authenticate');
    }

    const client = new faunadb.Client({ secret: FAUNADB_SECRET });

    return {
      activeUserRef,
      DocumentDataWithId,
      formatRefs,
      clientIp: event.headers['client-ip'],
      client,
      q,
    };
  },
});

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});
