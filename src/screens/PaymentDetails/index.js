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
  number: Yup.string().required(),
  exp: Yup.string().required(),
  cvc: Yup.string().required(),
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
      number: '',
      exp: '',
      cvc: '',
    },
    validationSchema,
    onSubmit: async ({ name, number, exp, cvc }) => {
      const [exp_month, exp_year] = exp.split('/');
      const card = await stripe.createToken({
        card: {
          name,
          number,
          exp_month,
          exp_year,
          cvc,
        },
      });

      updatePaymentDetails({
        variables: {
          cardToken: card.id,
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
                  label="Name on card"
                  placeholder="e.g John Smith"
                  error={formik.errors.name}
                  onChangeText={formik.handleChange('name')}
                  onBlur={formik.handleBlur('name')}
                />
              </Grid.Item>

              <Grid.Item size={12}>
                <TextInput
                  label="Card Number"
                  placeholder="e.g 1234 5678 4242 4242"
                  error={formik.errors.number}
                  onChangeText={formik.handleChange('number')}
                  onBlur={formik.handleBlur('number')}
                />
              </Grid.Item>

              <Grid.Item size={12}>
                <TextInput
                  label="Expiry"
                  placeholder="MM/YY"
                  error={formik.errors.exp}
                  onChangeText={formik.handleChange('exp')}
                  onBlur={formik.handleBlur('exp')}
                />
              </Grid.Item>

              <Grid.Item size={12}>
                <TextInput
                  label="CVC"
                  placeholder="e.g 522"
                  error={formik.errors.cvc}
                  onChangeText={formik.handleChange('cvc')}
                  onBlur={formik.handleBlur('cvc')}
                />
              </Grid.Item>

              <Grid.Item size={12}>
                <Actions>
                  <Button
                    title={formik.isValid ? 'Next' : 'Skip'}
                    fixedWidth
                    isLoading={loading}
                    onPress={() => {
                      if (formik.isValid) {
                        formik.handleSubmit();
                        return;
                      }
                      navigation.navigate('Social');
                    }}
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
