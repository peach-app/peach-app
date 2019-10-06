import ApolloClient from 'apollo-boost';

// Auth: fnADaBgWYhACABm6S2kVc3g_g5X1VKARMNMuWOeR
// User: fnEDaBcv_jACEwNn3n2NMAICNmAtv4XUp8RDD9VyiBgqRcpVH4E

const client = new ApolloClient({
  uri: 'https://graphql.fauna.com/graphql',
  headers: {
    authorization: `Bearer fnEDaBcv_jACEwNn3n2NMAICNmAtv4XUp8RDD9VyiBgqRcpVH4E`,
  },
});

export default client;
