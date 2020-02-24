import React from 'react';
import { useFormik } from 'formik';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/react-hooks';

import {
  SafeAreaView,
  Header,
  StatusBar,
  Container,
  Grid,
  TextInput,
  Actions,
  Button,
  Intro,
} from 'components';

import { stripe } from '../../stripe';
import UPDATE_PAYMENT_DETAILS from './graphql/update-payment-details';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Account holder name is required'),
  account: Yup.string().required('Account number is required'),
  sort: Yup.string().required('Sort code is required'),
});

export const AccountDetails = () => {
  const navigation = useNavigation();
  const [updatePaymentDetails, { loading }] = useMutation(
    UPDATE_PAYMENT_DETAILS,
    {
      onCompleted: () => navigation.goBack(),
    }
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      sort: '',
      account: '',
    },
    validationSchema,
    onSubmit: async ({ name, sort, account }) => {
      const token = await stripe.createToken({
        bank_account: {
          country: 'GB',
          currency: 'gbp',
          account_holder_name: name,
          routing_number: sort.replace(/-/g, ''),
          account_number: account,
        },
      });

      if (!token.id) return;

      updatePaymentDetails({
        variables: {
          token: token.id,
        },
      });
    },
  });

  return (
    <SafeAreaView>
      <StatusBar />
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Header title="Account Details" />
        <ScrollView>
          <Container>
            <Intro />
            <Grid>
              <Grid.Item size={12}>
                <TextInput
                  label="Account holder name"
                  placeholder="e.g John Smith"
                  error={formik.errors.name}
                  onChangeText={formik.handleChange('name')}
                  onBlur={formik.handleBlur('name')}
                />
              </Grid.Item>

              <Grid.Item size={12}>
                <TextInput
                  label="Sort code"
                  placeholder="e.g 01-02-03"
                  error={formik.errors.sort}
                  onChangeText={formik.handleChange('sort')}
                  onBlur={formik.handleBlur('sort')}
                />
              </Grid.Item>

              <Grid.Item size={12}>
                <TextInput
                  label="Account number"
                  placeholder="e.g 12345678"
                  error={formik.errors.account}
                  onChangeText={formik.handleChange('account')}
                  onBlur={formik.handleBlur('account')}
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
