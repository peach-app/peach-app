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
      <Header title="Payment Details" />
      <Container>
        <Grid>
          <Grid.Item size={12}>
            <Intro>
              <TextInput
                label="Card Number"
                error={formik.errors.cardNum}
                onChangeText={formik.handleChange('cardNum')}
                onBlur={formik.handleBlur('cardNum')}
              />
            </Intro>
          </Grid.Item>

          <Grid.Item size={12}>
            <Actions>
              <Button
                title="Next"
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
