import React from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/react-hooks';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import {
  SafeAreaView,
  Header,
  Container,
  Grid,
  TextInput,
  Actions,
  Button,
  Intro,
  GraphQLErrors,
  Text,
} from 'components';

import { stripe } from '../../stripe';
import CREATE_BILLING_METHOD from './graphql/create-billing-method';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Account holder name is required'),
  number: Yup.string().required('Account number is required'),
  sort: Yup.string().required('Sort code is required'),
});

export const NewBilling = () => {
  const navigation = useNavigation();
  const [createBillingMethod, { loading, error }] = useMutation(
    CREATE_BILLING_METHOD,
    {
      refetchQueries: ['getExternalAccount'],
      onCompleted: () => {
        navigation.goBack();
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      number: '',
      sort: '',
    },
    validationSchema,
    onSubmit: async ({ name, number, sort }) => {
      const { id, error } = await stripe.createToken({
        bank_account: {
          country: 'gb',
          currency: 'gbp',
          account_holder_name: name,
          routing_number: sort.replace(/-/g, ''),
          account_number: number,
        },
      });

      if (error) {
        formik.setErrors({ generic: error.message });
        return;
      }

      createBillingMethod({
        variables: {
          token: id,
        },
      });
    },
  });

  return (
    <SafeAreaView>
      <Header title="New Billing Method" />
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
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
                  label="Account number"
                  placeholder="e.g 01234567"
                  keyboardType="number-pad"
                  error={formik.errors.number}
                  onChangeText={formik.handleChange('number')}
                  onBlur={formik.handleBlur('number')}
                />
              </Grid.Item>

              <Grid.Item size={12}>
                <TextInput
                  label="Sort code"
                  placeholder="e.g 01-02-33"
                  error={formik.errors.sort}
                  onChangeText={formik.handleChange('sort')}
                  onBlur={formik.handleBlur('sort')}
                />
              </Grid.Item>

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