import ApolloClient from 'apollo-boost';
import { AsyncStorage } from 'react-native';

const client = new ApolloClient({
  uri: 'https://graphql.fauna.com/graphql',
  request: async operation => {
    const token = await AsyncStorage.getItem('token');

    operation.setContext({
      headers: {
        authorization: token
          ? `Bearer ${token}`
          : 'Bearer fnADcuFlk7ACAC2eAW2YzfTZiA9vbQZ5-caS0x6Q',
      },
    });
  },
});

export default client;
