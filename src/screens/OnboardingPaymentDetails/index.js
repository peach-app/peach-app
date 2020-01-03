import React from 'react';
import { useFormik } from 'formik';

import SafeAreaView from '../../components/SafeAreaView';
import Header from '../../components/Header';
import StatusBar from '../../components/StatusBar';
import Container from '../../components/Container';
import { Grid, GridItem } from '../../components/Grid';
import TextInput from '../../components/TextInput';
import Actions from '../../components/Actions';
import Button from '../../components/Button';
import Intro from '../../components/Intro';

const OnboardingPaymentDetails = () => {
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
          <GridItem size={12}>
            <Intro>
              <TextInput
                label="Card Number"
                error={formik.errors.cardNum}
                onChangeText={formik.handleChange('cardNum')}
                onBlur={formik.handleBlur('cardNum')}
              />
            </Intro>
          </GridItem>

          <GridItem size={12}>
            <Actions>
              <Button title="Finish" fixedWidth />
            </Actions>
          </GridItem>
        </Grid>
      </Container>
    </SafeAreaView>
  );
};

export default OnboardingPaymentDetails;
