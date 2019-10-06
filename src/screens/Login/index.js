import React, { useContext } from 'react';
import { SafeAreaView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import get from 'lodash/fp/get';

import { Header } from './styles';
import Container from '../../components/Container';
import { Grid, GridItem } from '../../components/Grid';
import Intro from '../../components/Intro';
import Title from '../../components/Title';
import Button from '../../components/Button';
import Actions from '../../components/Actions';
import TextInput from '../../components/TextInput';
import Text from '../../components/Text';
import AuthContext from '../../contexts/Auth';
import LOGIN from './graphql/login';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string().required(),
});

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted: data => {
      setAuth(get('login.secret', data));
    },
  });
  console.log(error);

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
            <Header>
              <Intro>
                <Title isCenter>Login</Title>
              </Intro>
            </Header>
            <Grid>
              {error && (
                <GridItem>
                  <Text>Incorrect Email or Password</Text>
                </GridItem>
              )}

              <GridItem>
                <TextInput
                  keyboardType="email-address"
                  autoCapitalize="none"
                  label="Email Address"
                  name="email"
                />
              </GridItem>

              <GridItem>
                <TextInput label="Password" name="password" secureTextEntry />
              </GridItem>

              <GridItem>
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
