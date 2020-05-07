import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import { useMutation } from '@apollo/react-hooks';

import {
  SafeAreaView,
  StatusBar,
  Header,
  Intro,
  Container,
  Grid,
  Text,
  TextInput,
  Actions,
  Button,
  KeyboardAvoidingView,
  ScrollView,
} from 'components';

import COMPLETE_BOOKING from './graphql/complete-booking';

export const BookingCompletion = () => {
  const {
    params: { bookingId },
  } = useRoute();
  const navigation = useNavigation();

  const [completeBooking, { loading }] = useMutation(COMPLETE_BOOKING, {
    refetchQueries: ['getCampaign', 'getCampaigns'],
    onCompleted: () => {
      navigation.goBack();
    },
  });

  const formik = useFormik({
    initialValues: {
      note: '',
    },
    onSubmit: ({ note }) => {
      completeBooking({
        variables: {
          id: bookingId,
          note,
        },
      });
    },
  });

  return (
    <SafeAreaView>
      <StatusBar />
      <Header title="Campaign Submission" />
      <KeyboardAvoidingView>
        <ScrollView>
          <Container>
            <Intro />
            <Grid>
              <Grid.Item size={12}>
                <Text>{`You're about to submit your work for this campaign.\nSupply any links or additional information below.`}</Text>
              </Grid.Item>
              <Grid.Item size={12}>
                <TextInput
                  multiline
                  style={{ minHeight: 100 }}
                  error={formik.errors.note}
                  onChangeText={formik.handleChange('note')}
                  onBlur={formik.handleBlur('note')}
                />
              </Grid.Item>
            </Grid>
          </Container>
        </ScrollView>
        <Actions>
          <Button
            title="Submit"
            isLoading={loading}
            fixedWidth
            onPress={formik.handleSubmit}
          />
        </Actions>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
