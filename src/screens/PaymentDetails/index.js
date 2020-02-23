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
  Text,
} from 'components';

import { stripe } from '../../stripe';
import UPDATE_PAYMENT_DETAILS from './graphql/update-payment-details';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  account: Yup.string().required(),
  sort: Yup.string().required(),
});

export const PaymentDetails = () => {
  const navigation = useNavigation();
  const [updatePaymentDetails, { loading }] = useMutation(
    UPDATE_PAYMENT_DETAILS,
    {
      onCompleted: () => {
        navigation.navigate('Social');
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      account: '',
      sort: '',
    },
    validationSchema,
    onSubmit: async ({ name, account, sort }) => {
      const token = await stripe.createToken({
        bank_account: {
          country: 'GB',
          currency: 'gbp',
          account_holder_name: name,
          account_number: account,
          routing_number: sort,
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
        <Header title="Bank Account Details" />
        <ScrollView>
          <Container>
            <Intro />
            <Grid>
              <Grid.Item size={12}>
                <Text isPara>
                  {
                    'Enter your account details to speed up campaign \napplication approvals.'
                  }
                </Text>
              </Grid.Item>

              <Grid.Item size={12}>
                <TextInput
                  label="Account Name"
                  placeholder="e.g John Smith"
                  error={formik.errors.name}
                  onChangeText={formik.handleChange('name')}
                  onBlur={formik.handleBlur('name')}
                />
              </Grid.Item>

              <Grid.Item size={12}>
                <TextInput
                  label="Account Number"
                  placeholder="e.g 12345678"
                  error={formik.errors.account}
                  onChangeText={formik.handleChange('account')}
                  onBlur={formik.handleBlur('account')}
                />
              </Grid.Item>

              <Grid.Item size={12}>
                <TextInput
                  label="Sort Code"
                  placeholder="e.g 01-02-03"
                  error={formik.errors.sort}
                  onChangeText={formik.handleChange('sort')}
                  onBlur={formik.handleBlur('sort')}
                />
              </Grid.Item>

              <Grid.Item size={12}>
                <Actions>
                  <Button
                    title="Next"
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
