import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { RestLink } from 'apollo-link-rest';
import { setContext } from 'apollo-link-context';
import { AsyncStorage } from 'react-native';

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: 'https://graphql.fauna.com/graphql',
});

const restLink = new RestLink({
  uri: 'https://dashboard.peachapp.io/.netlify/functions',
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token');

  return {
    headers: {
      ...headers,
      Authorization: token
        ? `Bearer ${token}`
        : 'Bearer fnADcuFlk7ACAC2eAW2YzfTZiA9vbQZ5-caS0x6Q',
    },
  };
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(restLink.concat(httpLink)),
});

export default client;
