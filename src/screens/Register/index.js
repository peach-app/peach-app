import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import get from 'lodash/fp/get';

import { USER_TYPE_TABS, FORM_INPUTS, FORM_ERROR_MESSAGES } from './consts';
import { useAuth } from '../../contexts/Auth';
import SafeAreaView from '../../components/SafeAreaView';
import StatusBar from '../../components/StatusBar';
import Container from '../../components/Container';
import { Grid, GridItem } from '../../components/Grid';
import Intro from '../../components/Intro';
import Title from '../../components/Title';
import Tabs from '../../components/Tabs';
import TextInput from '../../components/TextInput';
import Text from '../../components/Text';
import Actions from '../../components/Actions';
import Button from '../../components/Button';
import BackButton from '../../components/BackButton';

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

const Register = () => {
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
        },
      });
    },
  });

  return (
    <SafeAreaView>
      <StatusBar />
      <Container>
        <Grid>
          <GridItem size={12}>
            <Intro>
              <Grid>
                <GridItem size={12}>
                  <BackButton />
                </GridItem>
                <GridItem size={12}>
                  <Title>Sign Up</Title>
                </GridItem>
              </Grid>
            </Intro>
          </GridItem>

          <GridItem size={12}>
            <Tabs
              activeTabIndex={activeTab}
              onTabPress={setTab}
              tabs={USER_TYPE_TABS}
            />
          </GridItem>

          {FORM_INPUTS.map(input => (
            <GridItem key={input.name} size={12}>
              <TextInput
                {...input}
                error={formik.errors[input.name]}
                onChangeText={formik.handleChange(input.name)}
                onBlur={formik.handleBlur(input.name)}
              />
            </GridItem>
          ))}

          {error && (
            <GridItem size={12}>
              <Text isCenter>An error occurred, please try again later.</Text>
            </GridItem>
          )}

          <GridItem size={12}>
            <Actions>
              <Button
                isLoading={loading}
                onPress={formik.handleSubmit}
                title="Sign Up"
                fixedWidth
              />
            </Actions>
          </GridItem>
        </Grid>
      </Container>
    </SafeAreaView>
  );
};

export default Register;
