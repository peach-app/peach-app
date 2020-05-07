import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRoute, useNavigation } from '@react-navigation/native';

import {
  SafeAreaView,
  StatusBar,
  Button,
  Intro,
  Header,
  Container,
  MoneyInput,
  Actions,
  Grid,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from 'components';

import APPLY_TO_CAMPAIGN from './graphql/apply-to-campaign';

const validationSchema = Yup.object().shape({
  cost: Yup.number()
    .min(500, 'Pay rate must be more than £5.00')
    .required('Please enter your pay rate for this campaign'),
});

export const Apply = () => {
  const {
    params: { id },
  } = useRoute();
  const navigation = useNavigation();

  const [applyToCampaign, { loading }] = useMutation(APPLY_TO_CAMPAIGN, {
    refetchQueries: ['getCampaign', 'getCampaigns'],
    onCompleted: () => navigation.goBack(),
  });

  const formik = useFormik({
    validationSchema,
    initialValues: {
      cost: '',
    },
    onSubmit: ({ cost }) => {
      applyToCampaign({
        variables: {
          id,
          cost: parseFloat(cost),
        },
      });
    },
  });

  return (
    <SafeAreaView>
      <StatusBar />
      <Header title="Campaign Application" />
      <KeyboardAvoidingView>
        <ScrollView>
          <Container>
            <Intro>
              <Grid>
                <Grid.Item size={12}>
                  <Text>{`You're about apply to work on a campaign.\nEnter how much you want to be paid below.`}</Text>
                </Grid.Item>
                <Grid.Item size={12}>
                  <MoneyInput
                    label="Pay rate (GBP)"
                    value={formik.values.cost}
                    error={formik.errors.cost}
                    onChange={formik.handleChange('cost')}
                    onBlur={formik.handleBlur('cost')}
                  />
                </Grid.Item>
              </Grid>
            </Intro>
          </Container>
        </ScrollView>
        <Actions>
          <Button
            fixedWidth
            title="Apply"
            isLoading={loading}
            onPress={formik.handleSubmit}
          />
        </Actions>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
