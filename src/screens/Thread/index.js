import React, { useState } from 'react';
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

import GET_MESSAGES from './graphql/get-messages';
import CREATE_MESSAGE from './graphql/create-message';
import GET_THREAD from './graphql/get-thread';

const Thread = ({ navigation }) => {
  const [text, setText] = useState('');
  const id = navigation.getParam('id');
  const { user } = useUser();
  const { data: thread } = useQuery(GET_THREAD, {
    variables: {
      id,
    },
  });
  const { data, refetch } = useQuery(GET_MESSAGES, {
    variables: {
      id,
    },
    pollInterval: 3000,
  });

  const [createMessage, { loading }] = useMutation(CREATE_MESSAGE, {
    onCompleted: () => {
      setText('');
      refetch();
    },
  });

  const onSubmit = () => {
    if (!text) return;

    createMessage({
      variables: {
        text,
        threadId: id,
      },
    });
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Header
          title={getOr([], 'findThreadByID.users.data', thread)
            .map(user => user.name || user.email)
            .join(', ')}
        />
        <FlatList
          inverted
          keyExtractor={item => item._id}
          data={getOr([], 'threadMessages.data', data)}
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