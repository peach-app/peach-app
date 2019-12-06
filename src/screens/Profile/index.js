import React from 'react';
import { ScrollView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/fp/get';
import startCase from 'lodash/startCase';

import SafeAreaView from '../../components/SafeAreaView';
import Header from '../../components/Header';
import Container from '../../components/Container';
import ProfileHeader from '../../components/ProfileHeader';

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
        <Container>
          <ProfileHeader {...get('findUserByID', data)} />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
