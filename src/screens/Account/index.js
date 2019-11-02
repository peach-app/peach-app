import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/fp/get';

import SafeAreaView from '../../components/SafeAreaView';
import StatusBar from '../../components/StatusBar';
import Container from '../../components/Container';
import NavLink from '../../components/NavLink';
import ProfileHeader from '../../components/ProfileHeader';
import GET_USER from './graphql/get-user';
import AuthContext from '../../contexts/Auth';

const Account = ({ navigation }) => {
  const { setAuth } = useContext(AuthContext);
  const { client, data, loading } = useQuery(GET_USER);

  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <StatusBar />
          <ProfileHeader isLoading={loading} {...get('user', data)} />
          <NavLink title="Account" iconProps={{ name: 'ios-arrow-forward' }} />
          <NavLink
            title="Payout History"
            iconProps={{ name: 'ios-arrow-forward' }}
            onPress={() => navigation.navigate('Payouts')}
          />
          <NavLink
            title="Logout"
            onPress={() => {
              client.resetStore();
              setAuth(null);
            }}
          />
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;
