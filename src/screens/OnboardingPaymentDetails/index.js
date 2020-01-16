import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { ScrollView, KeyboardAvoidingView } from 'react-native';

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
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Header title="Bank Account Details" />
        <ScrollView>
          <Container>
            <Intro />
            <Grid>
              <Grid.Item size={12}>
                <Text isPara>
                  Enter your account details to speed up campaign application
                  approvals. Alternatively skip now, and enter your details when
                  you accept your first influencer.
                </Text>
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
                    onPress={() => navigation.navigate('Social')}
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

OnboardingPaymentDetails.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default OnboardingPaymentDetails;
