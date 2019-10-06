import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/fp/get';

import Container from '../../components/Container';
import NavLink from '../../components/NavLink';
import ProfileHeader from '../../components/ProfileHeader';
import GET_USER from './graphql/get-user';
import AuthContext from '../../contexts/Auth';

const Account = () => {
  const { setAuth } = useContext(AuthContext);
  const { data } = useQuery(GET_USER);

  return (
    <SafeAreaView>
      <Container>
        <ProfileHeader {...get('user', data)} />
        <NavLink title="Account" />
        <NavLink title="Payout History" />
        <NavLink title="Logout" onPress={() => setAuth(null)} />
      </Container>
    </SafeAreaView>
  );
};

export default Account;
