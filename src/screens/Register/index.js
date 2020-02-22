import React, { useState } from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import get from 'lodash/fp/get';
import getOr from 'lodash/fp/getOr';
import uuid from 'uuid/v4';

import {
  SafeAreaView,
  StatusBar,
  Container,
  Grid,
  Intro,
  Title,
  Tabs,
  TextInput,
  Text,
  Actions,
  Button,
  BackButton,
} from 'components';
import { useAuth } from 'contexts/Auth';

import { USER_TYPE_TABS, FORM_INPUTS, FORM_ERROR_MESSAGES } from './consts';
import REGISTER from './graphql/register';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(FORM_ERROR_MESSAGES.REQUIRED_NAME),
  email: Yup.string()
    .required(FORM_ERROR_MESSAGES.REQUIRED_EMAIL)
    .email(FORM_ERROR_MESSAGES.INVALID_EMAIL),
  password: Yup.string().required(FORM_ERROR_MESSAGES.REQUIRED_PASSWORD),
  confirmPassword: Yup.string().required(
    FORM_ERROR_MESSAGES.REQUIRED_CONFIRM_PASSWORD
  ),
});

export const Register = () => {
  const [activeTab, setTab] = useState(0);
  const { setToken } = useAuth();
  const [register, { loading, error }] = useMutation(REGISTER, {
    onCompleted: data => {
      setToken(get('register.secret', data));
    },
  });

  const formik = useFormik({
    validateOnBlur: false,
    validationSchema,
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: ({ name, email, password, confirmPassword }) => {
      if (password !== confirmPassword) {
        formik.setErrors({
          confirmPassword: "Passwords don't correctly match",
        });
        return false;
      }

      register({
        variables: {
          name,
          email,
          password,
          type: USER_TYPE_TABS[activeTab],
          idempotency_key: uuid(),
        },
      });
    },
  });

  return (
    <SafeAreaView>
      <StatusBar />
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView>
          <Container>
            <Grid>
              <Grid.Item size={12}>
                <Intro>
                  <Grid>
                    <Grid.Item size={12}>
                      <BackButton />
                    </Grid.Item>
                    <Grid.Item size={12}>
                      <Title>Sign Up</Title>
                    </Grid.Item>
                  </Grid>
                </Intro>
              </Grid.Item>

              <Grid.Item size={12}>
                <Tabs
                  activeTabIndex={activeTab}
                  onTabPress={setTab}
                  tabs={USER_TYPE_TABS}
                />
              </Grid.Item>

              {FORM_INPUTS.map(input => (
                <Grid.Item key={input.name} size={12}>
                  <TextInput
                    {...input}
                    error={formik.errors[input.name]}
                    onChangeText={formik.handleChange(input.name)}
                    onBlur={formik.handleBlur(input.name)}
                  />
                </Grid.Item>
              ))}

              {error && (
                <Grid.Item size={12}>
                  {getOr([], 'graphQLErrors', error).map(({ message }, i) => (
                    <Text isCenter key={i}>
                      {message}
                    </Text>
                  ))}
                </Grid.Item>
              )}

              <Grid.Item size={12}>
                <Actions>
                  <Button
                    isLoading={loading}
                    onPress={formik.handleSubmit}
                    title="Sign Up"
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
