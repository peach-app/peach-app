import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import get from 'lodash/fp/get';

import SafeAreaView from '../../components/SafeAreaView';
import StatusBar from '../../components/StatusBar';
import Container from '../../components/Container';
import { Grid, GridItem } from '../../components/Grid';
import Intro from '../../components/Intro';
import Title from '../../components/Title';
import Button from '../../components/Button';
import Actions from '../../components/Actions';
import TextInput from '../../components/TextInput';
import Text from '../../components/Text';
import BackButton from '../../components/BackButton';
import { useAuth } from '../../contexts/Auth';
import LOGIN from './graphql/login';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string().required(),
});

const Login = () => {
  const { setToken } = useAuth();
  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted: data => {
      setToken(get('login.secret', data));
    },
  });

  return (
    <Formik
      validateOnBlur={false}
      validateOnChange={false}
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={({ email, password }) => {
        login({
          variables: {
            email,
            password,
          },
        });
      }}
    >
      {({ handleSubmit }) => (
        <SafeAreaView>
          <Container>
            <StatusBar />
            <Grid>
              <GridItem size={12}>
                <Intro>
                  <Grid>
                    <GridItem size={12}>
                      <BackButton />
                    </GridItem>
                    <GridItem size={12}>
                      <Title>Login</Title>
                    </GridItem>
                  </Grid>
                </Intro>
              </GridItem>

              {error && (
                <GridItem size={12}>
                  <Text>Incorrect Email or Password</Text>
                </GridItem>
              )}

              <GridItem size={12}>
                <TextInput
                  keyboardType="email-address"
                  autoCapitalize="none"
                  label="Email Address"
                  name="email"
                />
              </GridItem>

              <GridItem size={12}>
                <TextInput label="Password" name="password" secureTextEntry />
              </GridItem>

              <GridItem size={12}>
                <Actions>
                  <Button
                    isLoading={loading}
                    onPress={handleSubmit}
                    title="Login"
                    fixedWidth
                  />
                </Actions>
              </GridItem>
            </Grid>
          </Container>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default Login;
