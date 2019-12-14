import React, { useState, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { KeyboardAvoidingView } from 'react-native';
import getOr from 'lodash/fp/getOr';
import startCase from 'lodash/startCase';

import { Composer, Wrapper, TextInput, Send, Icon } from './styles';
import SafeAreaView from '../../components/SafeAreaView';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import { FlatList } from '../../components/FlatList';
import NoResultText from '../../components/NoResultText';
import MessageBubble from '../../components/MessageBubble';

import SEND_MESSAGE from './graphql/send-message';
import GET_THREAD from './graphql/get-thread';

const Thread = ({ navigation }) => {
  const [text, setText] = useState('');
  const id = navigation.getParam('id');
  const { data } = useQuery(GET_THREAD, {
    variables: {
      id,
    },
    pollInterval: 3000,
  });

  const [sendMessage, { loading }] = useMutation(SEND_MESSAGE, {
    onCompleted: () => setText(''),
    refetchQueries: ['getThread'],
  });

  const onSubmit = () => {
    if (!text) return;

    sendMessage({
      variables: {
        text,
        threadId: id,
      },
    });
  };

  const title = useMemo(() => {
    return getOr([], 'findThreadById.users.data', data)
      .map(user => user.name)
      .join(', ');
  }, [data]);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Header title={startCase(title)} />
        <FlatList
          inverted
          keyExtractor={item => item._id}
          ListFooterComponent={<NoResultText>No more messages...</NoResultText>}
          data={getOr([], 'findThreadById.messages.data', data)}
          renderItem={({ item }) => <MessageBubble {...item} />}
        />

        <Composer>
          <Wrapper>
            <TextInput
              multiline
              autoFocus
              placeholder="Type a message..."
              value={text}
              onChangeText={setText}
            />

            <Send onPress={onSubmit}>{loading ? <Loading /> : <Icon />}</Send>
          </Wrapper>
        </Composer>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Thread;
