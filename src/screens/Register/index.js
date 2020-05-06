/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import get from 'lodash/fp/get';
import uuid from 'uuid/v4';
import { useModal } from 'contexts/Modal';
import { MODAL_TYPES } from 'consts';

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
  GraphQLErrors,
  SubTitle,
  KeyboardAvoidingView,
} from 'components';
import { useAuth } from 'contexts/Auth';

import { USER_TYPE_TABS, FORM_ERROR_MESSAGES } from './consts';
import REGISTER from './graphql/register';

const validationSchema = Yup.object().shape({
  code: Yup.string().required(FORM_ERROR_MESSAGES.REQUIRED_CODE),
  name: Yup.string()
    .max(25)
    .required(FORM_ERROR_MESSAGES.REQUIRED_NAME),
  email: Yup.string()
    .required(FORM_ERROR_MESSAGES.REQUIRED_EMAIL)
    .email(FORM_ERROR_MESSAGES.INVALID_EMAIL),
  password: Yup.string()
    .required(FORM_ERROR_MESSAGES.REQUIRED_PASSWORD)
    .min(8, 'Password must have at least 8 characters'),
  confirmPassword: Yup.string().required(
    FORM_ERROR_MESSAGES.REQUIRED_CONFIRM_PASSWORD
  ),
});

const Touchable = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Register = () => {
  const [activeTab, setTab] = useState(0);
  const { setToken } = useAuth();
  const [register, { loading, error }] = useMutation(REGISTER, {
    onCompleted: data => {
      setToken(get('register.secret', data));
    },
  });
  const { openModal } = useModal();

  const formik = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    initialValues: {
      code: '',
      name: '',
      email: '',
      password: '',
    },
    onSubmit: ({ code, name, email, password, confirmPassword }) => {
      if (password !== confirmPassword) {
        formik.setErrors({
          confirmPassword: "Passwords don't correctly match",
        });
        return false;
      }

      register({
        variables: {
          code,
          name,
          email,
          password,
          type: USER_TYPE_TABS[activeTab],
          idempotencyKey: uuid(),
        },
      });
    },
  });

  return (
    <SafeAreaView>
      <StatusBar />
      <KeyboardAvoidingView>
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

              <Grid.Item size={12}>
                <TextInput
                  label="Invite code"
                  autoCapitalize="none"
                  error={formik.errors.code}
                  onChangeText={formik.handleChange('code')}
                  onBlur={formik.handleBlur('code')}
                />
              </Grid.Item>

              <Grid.Item size={12}>
                <TextInput
                  label="Display name"
                  autoCapitalize="none"
                  error={formik.errors.name}
                  onChangeText={formik.handleChange('name')}
                  onBlur={formik.handleBlur('name')}
                />
              </Grid.Item>

              <Grid.Item size={12}>
                <TextInput
                  label="Email address"
                  keyboardType="email-address"
                  autoCapitalize="none"
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

              <Grid.Item size={12}>
                <TextInput
                  label="Confirm password"
                  secureTextEntry
                  error={formik.errors.confirmPassword}
                  onChangeText={formik.handleChange('confirmPassword')}
                  onBlur={formik.handleBlur('confirmPassword')}
                />
              </Grid.Item>

              {error && (
                <Grid.Item size={12}>
                  <GraphQLErrors error={error} />
                </Grid.Item>
              )}
              <Grid.Item size={12} />

              <Grid.Item size={12}>
                <Touchable
                  onPress={() => {
                    openModal({
                      type: MODAL_TYPES.WEB_VIEW_MODAL,
                      props: {
                        uri: 'https://peachapp.io/terms',
                      },
                    });
                  }}
                >
                  <Text isUnderlined isPara>
                    Our Service Agreement
                  </Text>
                </Touchable>
                <Touchable
                  onPress={() => {
                    openModal({
                      type: MODAL_TYPES.WEB_VIEW_MODAL,
                      props: {
                        uri: 'https://stripe.com/gb/connect-account/legal',
                      },
                    });
                  }}
                >
                  <Text isUnderlined isPara>
                    Stripe Connected Account Agreement
                  </Text>
                </Touchable>
              </Grid.Item>
              <Grid.Item size={12}>
                <SubTitle isCenter> ☝️ </SubTitle>
              </Grid.Item>
              <Grid.Item size={12}>
                <Text isPara isCenter>
                  By registering your account, you agree to our Services
                  Agreement and the Stripe Connected Account Agreement.
                </Text>
              </Grid.Item>
            </Grid>
          </Container>
        </ScrollView>
        <Actions>
          <Button
            isLoading={loading}
            onPress={formik.handleSubmit}
            title="Sign Up"
            fixedWidth
          />
        </Actions>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
