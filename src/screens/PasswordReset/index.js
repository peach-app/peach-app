import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import {
  Title,
  TextInput,
  Grid,
  Intro,
  Button,
  Actions,
  GraphQLErrors,
  FeedbackView,
  Loading,
} from 'components';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Content, Logo } from './styles';
import RESET_PASSWORD from './graphql/reset-password';
import getDeepLink from '../../helpers/getDeepLink';

const validationSchema = Yup.object().shape({
  password: Yup.string().required('Please enter an a password'),
  confirmedPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords does not match!')
    .required('You must confirm your password'),
});

const deepLinkBackToApp = async () => {
  const deepLink = await getDeepLink();
  window.location.href = deepLink;
};

export const PasswordReset = () => {
  const [isResetDone, setResetDone] = useState(false);
  const { userId } = useParams();

  const [resetPassword, { loading, error }] = useMutation(RESET_PASSWORD, {
    onCompleted: () => setResetDone(true),
  });
  const formik = useFormik({
    validateOnBlur: false,
    initialValues: {
      password: '',
      confirmedPassword: '',
    },
    validationSchema,
    onSubmit: ({ password, confirmedPassword }) => {
      resetPassword({
        variables: {
          userId,
          password,
          confirmedPassword,
        },
      });
    },
  });

  useEffect(() => {
    if (isResetDone) {
      const timer = setTimeout(() => {
        deepLinkBackToApp();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isResetDone]);

  return (
    <Content>
      {isResetDone ? (
        <>
          <FeedbackView
            title="Done!"
            subTitle="Redirecting you back to the app"
          />
          <Intro />
          <Loading size="large" />
        </>
      ) : (
        <>
          <Logo />
          <Title>Password Reset</Title>
          <Intro />
          <Grid>
            <Grid.Item size={12}>
              <TextInput
                secureTextEntry
                label="New Password"
                error={formik.errors.password}
                onChangeText={formik.handleChange('password')}
              />
            </Grid.Item>
            <Grid.Item size={12}>
              <TextInput
                secureTextEntry
                label="Confirm Password"
                error={formik.errors.confirmedPassword}
                onChangeText={formik.handleChange('confirmedPassword')}
              />
            </Grid.Item>
            {error && (
              <Grid.Item size={12}>
                <GraphQLErrors error={error} />
              </Grid.Item>
            )}
          </Grid>

          <Grid.Item size={12}>
            <Actions>
              <Button
                isLoading={loading}
                onPress={formik.handleSubmit}
                title="Reset"
                fixedWidth
              />
            </Actions>
          </Grid.Item>
        </>
      )}
    </Content>
  );
};
