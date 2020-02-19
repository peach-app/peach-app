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
  TextInput,
  Actions,
  Grid,
} from 'components';

import APPLY_TO_CAMPAIGN from './graphql/apply-to-campaign';

const validationSchema = Yup.object().shape({
  cost: Yup.number().required('Please enter your pay rate for this campaign'),
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
      <Container>
        <Intro>
          <Grid>
            <Grid.Item size={12}>
              <TextInput
                label="Pay Rate (GBP)"
                error={formik.errors.cost}
                onChangeText={formik.handleChange('cost')}
                onBlur={formik.handleBlur('cost')}
              />
            </Grid.Item>
            <Grid.Item size={12}>
              <Actions>
                <Button
                  fixedWidth
                  title="Apply"
                  isLoading={loading}
                  onPress={formik.handleSubmit}
                />
              </Actions>
            </Grid.Item>
          </Grid>
        </Intro>
      </Container>
    </SafeAreaView>
  );
};