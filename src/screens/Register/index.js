import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import AuthContext from '../../contexts/Auth';
import SafeAreaView from '../../components/SafeAreaView';
import StatusBar from '../../components/StatusBar';
import REGISTER_MUTATION from './graphql/register';
import RegisterForm from './RegisterForm';

const handleSubmit = data => console.log('data', data);

const Register = () => {
  const { setAuth } = useContext(AuthContext);
  const [register, { loading, error }] = useMutation(REGISTER_MUTATION, {
    onCompleted: ({ register: { secret } }) => {
      console.log('EEEEE', secret);
      setAuth(secret);
    },
  });
  // const { setAuth } = useContext(AuthContext);

  return (
    <SafeAreaView>
      <StatusBar />
      <RegisterForm
        onFormSubmit={variables => {
          register({ variables });
        }}
        isLoading={loading}
      />
    </SafeAreaView>
  );
};

export default Register;
