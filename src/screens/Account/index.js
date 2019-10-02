import React from 'react';
import { SafeAreaView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import { useLogout } from '../../hooks/useAuth';
import Container from '../../components/Container';
import Title from '../../components/Title';
import Intro from '../../components/Intro';
import Button from '../../components/Button';
import GET_USER from './graphql/get-user';

const Account = () => {
  const [logout, { loading }] = useLogout();
  const { data } = useQuery(GET_USER);

  return (
    <SafeAreaView>
      <Container>
        <Intro>
          <Title>Account</Title>
        </Intro>

        <Button
          isLoading={loading}
          title="Logout"
          onPress={() => {
            logout();
          }}
        />
      </Container>
    </SafeAreaView>
  );
};

export default Account;
