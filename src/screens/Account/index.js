import React from 'react';
import { ScrollView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/fp/get';
import { useNavigation } from '@react-navigation/native';

import {
  SafeAreaView,
  StatusBar,
  Container,
  NavLink,
  ProfileHeader,
} from '../../components';
import GET_USER from './graphql/get-user';
import { useAuth } from '../../contexts/Auth';

export const Account = () => {
  const navigation = useNavigation();
  const { setToken } = useAuth();
  const { client, data, loading } = useQuery(GET_USER);

  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <StatusBar />
          <ProfileHeader isLoading={loading} {...get('user', data)} />
          <NavLink
            title="Account"
            iconProps={{ name: 'ios-arrow-forward' }}
            onPress={() => navigation.navigate('AccountEdit')}
          />
          <NavLink
            title="Payout History"
            iconProps={{ name: 'ios-arrow-forward' }}
            onPress={() => navigation.navigate('Payouts')}
          />
          <NavLink
            title="Logout"
            onPress={async () => {
              await setToken(null);
              client.resetStore();
            }}
          />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};
