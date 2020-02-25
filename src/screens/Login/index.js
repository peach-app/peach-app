import React from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import get from 'lodash/fp/get';

import {
  SafeAreaView,
  StatusBar,
  Container,
  Grid,
  Intro,
  Title,
  Button,
  Actions,
  TextInput,
  Text,
  BackButton,
  GraphQLErrors,
} from 'components';
import { useAuth } from 'contexts/Auth';

import LOGIN from './graphql/login';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Please enter an email address'),
  password: Yup.string().required('Please enter a password'),
});

export const Login = () => {
  const { setToken } = useAuth();
  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted: data => {
      setToken(get('login.secret', data));
    },
  });

  const formik = useFormik({
    validateOnBlur: false,
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
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
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView>
          <Container>
            <StatusBar />
            <Grid>
              <Grid.Item size={12}>
                <Intro>
                  <Grid>
                    <Grid.Item size={12}>
                      <BackButton />
                    </Grid.Item>
                    <Grid.Item size={12}>
                      <Title>Login</Title>
                    </Grid.Item>
                  </Grid>
                </Intro>
              </Grid.Item>

              <Grid.Item size={12}>
                <TextInput
                  keyboardType="email-address"
                  autoCapitalize="none"
                  label="Email Address"
                  error={formik.errors.email}
                  onChangeText={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
                />
              </Grid.Item>

              <Grid.Item size={12}>
                <TextInput
                  label="Password"
                  secureTextEntry
                  error={formik.errors.password}
                  onChangeText={formik.handleChange('password')}
                  onBlur={formik.handleBlur('password')}
                />
              </Grid.Item>

              {error && (
                <Grid.Item size={12}>
                  <GraphQLErrors error={error} />
                </Grid.Item>
              )}

              <Grid.Item size={12}>
                <Actions>
                  <Button
                    isLoading={loading}
                    onPress={formik.handleSubmit}
                    title="Login"
                    fixedWidth
                  />
                </Actions>
              </Grid.Item>
            </Grid>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
