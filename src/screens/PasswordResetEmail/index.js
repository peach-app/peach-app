import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';

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
  BackButton,
  GraphQLErrors,
  SubTitle,
  FeedbackView,
  KeyboardAvoidingView,
  ScrollView,
} from 'components';

import REQUEST_PASSWORD_RESET from './graphql/request-reset-password';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Please enter an email address'),
});

const renderFeedback = () => (
  <FeedbackView
    title="Link sent!"
    subTitle="Check your email to reset your password."
  />
);

export const PasswordResetEmail = () => {
  const [isLinkSent, setLinkSent] = useState(false);

  const [requestPasswordReset, { loading, error }] = useMutation(
    REQUEST_PASSWORD_RESET,
    {
      onCompleted: () => setLinkSent(true),
    }
  );

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: ({ email }) => {
      requestPasswordReset({
        variables: {
          email,
        },
      });
    },
  });

  const renderResetForm = () => (
    <>
      <Grid.Item size={12}>
        <SubTitle>
          Enter your email address and we will send you a link to reset it.
        </SubTitle>
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
            title="Send"
            fixedWidth
          />
        </Actions>
      </Grid.Item>
    </>
  );

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
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
                      <Title>Password reset</Title>
                    </Grid.Item>
                    {isLinkSent ? renderFeedback() : renderResetForm()}
                  </Grid>
                </Intro>
              </Grid.Item>
            </Grid>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
