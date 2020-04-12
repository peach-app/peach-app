import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useNavigation, useRoute } from '@react-navigation/native';

import {
  SafeAreaView,
  StatusBar,
  Header,
  Container,
  Intro,
  Text,
  Foot,
  Button,
} from 'components';

import { Main, Charge, Cost } from './styles';
import ACCEPT_BOOKING from './graphql/accept-booking';

export const AcceptBooking = () => {
  const {
    params: { id },
  } = useRoute();
  const navigation = useNavigation();
  const [acceptBooking, { loading }] = useMutation(ACCEPT_BOOKING, {
    variables: {
      id,
    },
    refetchQueries: ['getCampaign', 'getCampaigns'],
    onCompleted: () => {
      navigation.goBack();
    },
  });

  return (
    <SafeAreaView>
      <StatusBar />
      <Header title="Accept Booking" />

      <Main>
        <Container>
          <Intro>
            <Text>
              You're about to accept Influencer Jeff onto your campaign
              (Biscuits and Tea...)
            </Text>
          </Intro>
        </Container>

        <Charge>
          <Text>You will be charged</Text>
          <Cost>£50.00</Cost>
        </Charge>
      </Main>

      <Foot>
        <Button
          title="Accept and Pay"
          fixedWidth
          isLoading={loading}
          onPress={() => acceptBooking()}
        />
      </Foot>
    </SafeAreaView>
  );
};
