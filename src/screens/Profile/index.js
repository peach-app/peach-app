import React from 'react';
import { ScrollView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/fp/get';
import startCase from 'lodash/startCase';

import { Main } from './styles';
import SafeAreaView from '../../components/SafeAreaView';
import Header from '../../components/Header';
import Intro from '../../components/Intro';
import Avatar from '../../components/Avatar';

import GET_USER from './graphql/get-user';

const Profile = ({ navigation }) => {
  const id = navigation.getParam('id');
  const { data } = useQuery(GET_USER, {
    variables: {
      id,
    },
  });

  const name =
    get('findUserByID.name', data) || get('findUserByID.email', data);

  return (
    <SafeAreaView>
      <Header title={startCase(name)} />
      <ScrollView>
        <Intro>
          <Main>
            <Avatar
              fallback={name}
              source={{ uri: get('findUserByID.avatar.url', data) }}
              size={120}
            />
          </Main>
        </Intro>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
