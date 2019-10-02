import React from 'react';
import { SafeAreaView } from 'react-native';

import { useLogout } from '../../hooks/useAuth';
import Container from '../../components/Container';
import Title from '../../components/Title';
import Intro from '../../components/Intro';
import Button from '../../components/Button';

const Account = () => {
  const [logout, { loading }] = useLogout();

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
