import React, { useState, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { KeyboardAvoidingView } from 'react-native';
import getOr from 'lodash/fp/getOr';
import get from 'lodash/fp/get';

import { Composer, Wrapper, TextInput, Send, Icon } from './styles';
import SafeAreaView from '../../components/SafeAreaView';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import { FlatList } from '../../components/FlatList';
import MessageBubble from '../../components/MessageBubble';
import { useUser } from '../../contexts/User';

import SEND_MESSAGE from './graphql/send-message';
import GET_THREAD from './graphql/get-thread';

const Thread = ({ navigation }) => {
  const [text, setText] = useState('');
  const id = navigation.getParam('id');
  const { user } = useUser();
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
      .filter(threadUser => threadUser._id !== user.user._id)
      .map(threadUser => threadUser.name || threadUser.email)
      .join(', ');
  }, [data, user]);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Header title={title} />
        <FlatList
          inverted
          keyExtractor={item => item._id}
          data={getOr([], 'findThreadById.messages.data', data)}
          renderItem={({ item }) => (
            <MessageBubble
              isSelf={get('user._id', user) === get('user._id', item)}
              {...item}
            />
          )}
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
