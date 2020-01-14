import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';

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
} from '../../components';

const OnboardingPaymentDetails = ({ navigation }) => {
  const formik = useFormik({
    initialValues: {
      cardNum: '',
    },
  });

  return (
    <SafeAreaView>
      <StatusBar />
      <Header title="Bank Account Details" />
      <Container>
        <Grid>
          <Grid.Item size={12}>
            <Intro>
              <Text isPara>
                Enter your account details to speed up campaign application
                approvals. Alternatively skip now, and enter your details when
                you accept your first influencer.
              </Text>
            </Intro>
          </Grid.Item>

          <Grid.Item size={12}>
            <TextInput
              label="Account number"
              error={formik.errors.cardNum}
              onChangeText={formik.handleChange('cardNum')}
              onBlur={formik.handleBlur('cardNum')}
            />
          </Grid.Item>

          <Grid.Item size={12}>
            <TextInput
              label="Sort code"
              error={formik.errors.cardNum}
              onChangeText={formik.handleChange('cardNum')}
              onBlur={formik.handleBlur('cardNum')}
            />
          </Grid.Item>

          <Grid.Item size={12}>
            <Actions>
              <Button
                title="Skip"
                fixedWidth
                onPress={() => navigation.navigate('Complete')}
              />
            </Actions>
          </Grid.Item>
        </Grid>
      </Container>
    </SafeAreaView>
  );
};

OnboardingPaymentDetails.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default OnboardingPaymentDetails;
