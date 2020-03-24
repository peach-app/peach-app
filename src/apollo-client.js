import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { AsyncStorage, Platform } from 'react-native';

const cache = new InMemoryCache();

const uri = {
  development: 'http://192.168.1.130:8888/.netlify/functions/graphql',
  production: Platform.select({
    web: '/.netlify/functions/graphql',
    ios: 'https://dashboard.peachapp.io/.netlify/functions/graphql',
    android: 'https://dashboard.peachapp.io/.netlify/functions/graphql',
  }),
}[process.env.NODE_ENV];

const httpLink = new HttpLink({
  uri,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token');

  return {
    headers: {
      ...headers,
      Authorization: token
        ? `Bearer ${token}`
        : 'Bearer fnADljiFUtACAjiuoc0favM4ODjnkH6TiyfXnMg6',
    },
  };
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
});

export default client;
