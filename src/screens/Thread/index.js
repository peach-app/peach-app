import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { KeyboardAvoidingView } from 'react-native';
import useForm from 'react-hook-form';
import getOr from 'lodash/fp/getOr';
import get from 'lodash/fp/get';

import { Composer, TextInput, Send, Icon } from './styles';
import SafeAreaView from '../../components/SafeAreaView';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import { FlatList } from '../../components/FlatList';
import MessageBubble from '../../components/MessageBubble';
import GET_USER from './graphql/get-user';
import GET_MESSAGES from './graphql/get-messages';
import CREATE_MESSAGE from './graphql/create-message';

const Thread = ({ navigation }) => {
  const id = navigation.getParam('id');
  const { data: user } = useQuery(GET_USER);
  const { data, refetch } = useQuery(GET_MESSAGES, {
    variables: {
      id,
    },
    pollInterval: 3000,
  });

  const { register, handleSubmit, setValue, reset } = useForm();
  const [createMessage, { loading }] = useMutation(CREATE_MESSAGE, {
    onCompleted: () => {
      reset();
      refetch();
    },
  });
  const onSubmit = handleSubmit(values =>
    createMessage({
      variables: {
        text: values.text,
        threadId: id,
      },
    })
  );

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Header title="Thread" />
        <FlatList
          inverted
          keyExtractor={item => item._id}
          data={getOr([], 'findThreadByID.messages.data', data)}
          renderItem={({ item }) => (
            <MessageBubble
              isSelf={get('user._id', user) === get('user._id', item)}
              {...item}
            />
          )}
        />

        <Composer>
          <TextInput
            ref={register({ name: 'text' })}
            placeholder="Type a message..."
            multiline
            onChangeText={text => setValue('text', text)}
          />

          <Send onPress={onSubmit}>{loading ? <Loading /> : <Icon />}</Send>
        </Composer>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Thread;
