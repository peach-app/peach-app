import React from 'react';
import { ScrollView } from 'react-native';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/native';

import {
  SafeAreaView,
  StatusBar,
  Header,
  Container,
  Intro,
  Grid,
  PaymentMethodForm,
  Actions,
  Button,
  Text,
  GraphQLErrors,
  KeyboardAvoidingView,
} from 'components';

import { stripe } from '../../stripe';
import CREATE_PAYMENT_METHOD from './graphql/create-payment-method';

const validationSchema = Yup.object().shape({
  number: Yup.string()
    .max(16)
    .required('Card number is required'),
  expiry: Yup.string()
    .matches(
      /([0-9]{2})\/([0-9]{2})/,
      'Not a valid expiration date. Example: MM/YY'
    )
    .required('Expiry date is required'),
  cvc: Yup.string()
    .min(3)
    .max(4)
    .required('CVC is required'),
});

export const NewPaymentMethod = () => {
  const navigation = useNavigation();

  const [createPaymentMethod, { loading, error }] = useMutation(
    CREATE_PAYMENT_METHOD,
    {
      refetchQueries: ['getPaymentMethods'],
      onCompleted: () => {
        navigation.goBack();
      },
    }
  );

  const formik = useFormik({
    validationSchema,
    initialValues: {
      number: '',
      expiry: '',
      cvc: '',
    },
    onSubmit: async ({ number, expiry, cvc }) => {
      const [expMonth, expYear] = expiry.split('/');
      const { id, error } = await stripe.createToken({
        card: {
          currency: 'gbp',
          number,
          exp_month: expMonth,
          exp_year: expYear,
          cvc,
        },
      });

      if (error) {
        formik.setErrors({ generic: error.message });
        return;
      }

      createPaymentMethod({
        variables: {
          token: id,
        },
      });
    },
  });

  return (
    <SafeAreaView>
      <StatusBar />
      <Header title="New Payment Method" />
      <KeyboardAvoidingView>
        <ScrollView>
          <Container>
            <Intro />
            <Grid>
              <PaymentMethodForm formik={formik} />

              {error && (
                <Grid.Item size={12}>
                  <GraphQLErrors error={error} />
                </Grid.Item>
              )}

              {formik.errors.generic && (
                <Grid.Item size={12}>
                  <Text isCenter>{formik.errors.generic}</Text>
                </Grid.Item>
              )}
            </Grid>
          </Container>
        </ScrollView>
        <Actions>
          <Button
            title="Save"
            fixedWidth
            isLoading={loading}
            onPress={formik.handleSubmit}
          />
        </Actions>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
