import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/fp/get';

import Container from '../../components/Container';
import Title from '../../components/Title';
import Text from '../../components/Text';
import Intro from '../../components/Intro';
import Button from '../../components/Button';
import GET_USER from './graphql/get-user';
import AuthContext from '../../contexts/Auth';

const Account = () => {
  const { setAuth } = useContext(AuthContext);
  const { data } = useQuery(GET_USER);

  return (
    <SafeAreaView>
      <Container>
        <Intro>
          <Title>Account</Title>
          <Text>{get('user.email', data)}</Text>
        </Intro>

        <Button title="Logout" onPress={() => setAuth(null)} />
      </Container>
    </SafeAreaView>
  );
};

export default Account;
