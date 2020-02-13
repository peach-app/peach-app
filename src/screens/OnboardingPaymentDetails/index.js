import React from 'react';
import { useFormik } from 'formik';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

export const OnboardingPaymentDetails = () => {
  const navigation = useNavigation();
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
                  {
                    'Enter your account details to speed up campaign \napplication approvals.'
                  }
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
