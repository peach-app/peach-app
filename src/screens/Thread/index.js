import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FlatList } from 'react-native';
import getOr from 'lodash/fp/getOr';

import Text from '../../components/Text';
import SafeAreaView from '../../components/SafeAreaView';
import Header from '../../components/Header';
import GET_MESSAGES from './graphql/get-messages';

const Thread = ({ navigation }) => {
  const id = navigation.getParam('id');
  const { data } = useQuery(GET_MESSAGES, {
    variables: {
      id,
    },
  });

  return (
    <SafeAreaView>
      <Header title="Thread" />
      <FlatList
        inverted
        keyExtractor={item => item._id}
        data={getOr([], 'findThreadByID.messages.data', data)}
        renderItem={({ item }) => <Text>{item.text}</Text>}
      />
    </SafeAreaView>
  );
};

export default Thread;
