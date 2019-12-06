import React, { useContext } from 'react';
import get from 'lodash/fp/get';
import { useMutation } from '@apollo/react-hooks';
import AuthContext from '../../contexts/Auth';
import SafeAreaView from '../../components/SafeAreaView';
import StatusBar from '../../components/StatusBar';
import REGISTER_MUTATION from './graphql/register';
import RegisterForm from './RegisterForm';

const Register = () => {
  const { setToken } = useContext(AuthContext);
  const [register, { loading, error }] = useMutation(REGISTER_MUTATION, {
    onCompleted: data => {
      setToken(get('register.secret', data));
    },
  });

  return (
    <SafeAreaView>
      <StatusBar />
      <RegisterForm
        onFormSubmit={variables => {
          console.log('variables', variables);
          register({ variables });
        }}
        error={error}
        isLoading={loading}
      />
    </SafeAreaView>
  );
};

export default Register;
