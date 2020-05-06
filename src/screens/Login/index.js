import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import get from 'lodash/fp/get';
import { useNavigation } from '@react-navigation/native';

import {
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
  KeyboardAvoidingView,
} from 'components';
import { useAuth } from 'contexts/Auth';

import { Main, Touchable, Graphic, Form } from './styles';

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

  const navigation = useNavigation();

  const formik = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
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
    <Main>
      <StatusBar />
      <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <Graphic />
          <SafeAreaView>
            <Container>
              <Intro>
                <BackButton />
              </Intro>
            </Container>
          </SafeAreaView>

          <Form>
            <Container>
              <Grid>
                <Grid.Item size={12}>
                  <Title>Login</Title>
                </Grid.Item>

                <Grid.Item size={12}>
                  <TextInput
                    keyboardType="email-address"
                    autoCapitalize="none"
                    label="Email address"
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
                  <Touchable>
                    <Text
                      isCenter
                      isUnderlined
                      onPress={() => navigation.navigate('PasswordResetEmail')}
                    >
                      Forgot your password?
                    </Text>
                  </Touchable>
                </Grid.Item>
              </Grid>
            </Container>
          </Form>
        </ScrollView>
        <SafeAreaView>
          <Actions>
            <Button
              isLoading={loading}
              onPress={formik.handleSubmit}
              title="Login"
              fixedWidth
            />
          </Actions>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </Main>
  );
};
