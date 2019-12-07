import React from 'react';
import { useFormik } from 'formik';
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
    .email('Please enter a valid email address')
    .required('Please enter an email address'),
  password: Yup.string().required('Please enter a password'),
});

const Login = () => {
  const { setToken } = useAuth();
  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted: data => {
      setToken(get('login.secret', data));
    },
  });

  const formik = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit: ({ email, password }) => {
      login({
        variables: {
          email,
          password,
        },
      });
    },
  });

  return (
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
              <Text isCenter>Incorrect Email or Password</Text>
            </GridItem>
          )}

          <GridItem size={12}>
            <TextInput
              keyboardType="email-address"
              autoCapitalize="none"
              label="Email Address"
              error={formik.errors.email}
              onChangeText={formik.handleChange('email')}
              onBlur={formik.handleBlur('email')}
            />
          </GridItem>

          <GridItem size={12}>
            <TextInput
              label="Password"
              secureTextEntry
              error={formik.errors.password}
              onChangeText={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
            />
          </GridItem>

          <GridItem size={12}>
            <Actions>
              <Button
                isLoading={loading}
                onPress={formik.handleSubmit}
                title="Login"
                fixedWidth
              />
            </Actions>
          </GridItem>
        </Grid>
      </Container>
    </SafeAreaView>
  );
};

export default Login;
