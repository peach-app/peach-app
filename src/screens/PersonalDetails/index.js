import React from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import get from 'lodash/fp/get';

import {
  SafeAreaView,
  Header,
  Container,
  Intro,
  Grid,
  TextInput,
  DatePicker,
  Actions,
  Button,
} from 'components';

import GET_USER from './graphql/get-user';
import UPDATE_USER from './graphql/update-user';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Please enter an email address'),
  dob: Yup.string().required(),
  addressLine1: Yup.string().required(),
  city: Yup.string().required(),
  postalCode: Yup.string().required(),
});

export const PersonalDetails = () => {
  const navigation = useNavigation();
  const { data } = useQuery(GET_USER);
  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    onCompleted: () => {
      navigation.goBack();
    },
  });

  const formik = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    initialValues: {
      firstName: get('user.stripeAccount.individual.first_name', data),
      lastName: get('user.stripeAccount.individual.last_name', data),
      email: get('user.email', data),
      dob: '',
      addressLine1: get('user.stripeAccount.individual.address.line1', data),
      addressLine2: get('user.stripeAccount.individual.address.line2', data),
      city: get('user.stripeAccount.individual.address.city', data),
      postalCode: get(
        'user.stripeAccount.individual.address.postal_code',
        data
      ),
    },
    validationSchema,
    onSubmit: user => {
      updateUser({
        variables: {
          user,
        },
      });
    },
  });

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Header title="Personal Details" />
        <ScrollView>
          <Container>
            <Intro />
            <Grid>
              <Grid.Item size={6}>
                <TextInput
                  label="First name"
                  value={formik.values.firstName}
                  error={formik.errors.firstName}
                  onChangeText={formik.handleChange('firstName')}
                  onBlur={formik.handleBlur('firstName')}
                />
              </Grid.Item>

              <Grid.Item size={6}>
                <TextInput
                  label="Last name"
                  value={formik.values.lastName}
                  error={formik.errors.lastName}
                  onChangeText={formik.handleChange('lastName')}
                  onBlur={formik.handleBlur('lastName')}
                />
              </Grid.Item>

              <Grid.Item size={12}>
                <TextInput
                  keyboardType="email-address"
                  autoCapitalize="none"
                  label="Email address"
                  value={formik.values.email}
                  error={formik.errors.email}
                  onChangeText={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
                />
              </Grid.Item>

              <Grid.Item size={12}>
                <DatePicker
                  label="Date of birth"
                  error={formik.errors.dob}
                  value={formik.values.dob}
                  onChange={selectedDate => {
                    formik.setFieldValue('dob', selectedDate);
                  }}
                />
              </Grid.Item>

              <Grid.Item size={12}>
                <TextInput
                  label="Address"
                  placeholder="Address line 1"
                  value={formik.values.addressLine1}
                  error={formik.errors.addressLine1}
                  onChangeText={formik.handleChange('addressLine1')}
                  onBlur={formik.handleBlur('addressLine1')}
                />
              </Grid.Item>

              <Grid.Item size={12}>
                <TextInput
                  placeholder="Address line 2"
                  value={formik.values.addressLine2}
                  error={formik.errors.addressLine2}
                  onChangeText={formik.handleChange('addressLine2')}
                  onBlur={formik.handleBlur('addressLine2')}
                />
              </Grid.Item>

              <Grid.Item size={6}>
                <TextInput
                  label="Town/City"
                  value={formik.values.city}
                  error={formik.errors.city}
                  onChangeText={formik.handleChange('city')}
                  onBlur={formik.handleBlur('city')}
                />
              </Grid.Item>

              <Grid.Item size={6}>
                <TextInput
                  label="Postal code"
                  value={formik.values.postalCode}
                  error={formik.errors.postalCode}
                  onChangeText={formik.handleChange('postalCode')}
                  onBlur={formik.handleBlur('postalCode')}
                />
              </Grid.Item>

              <Grid.Item size={12}>
                <Actions>
                  <Button
                    title="Save"
                    fixedWidth
                    isLoading={loading}
                    onPress={formik.handleSubmit}
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
